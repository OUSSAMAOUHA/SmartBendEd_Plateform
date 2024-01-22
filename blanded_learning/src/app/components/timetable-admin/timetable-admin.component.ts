import { Component } from '@angular/core';
import {CalendarOptions, EventClickArg, EventContentArg} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import {Session} from "../../models/session.model";
import {EtudiantService} from "../../services/etudiant.service";
import {CookieService} from "ngx-cookie-service";
import {TimeTableService} from "../../services/timeTable.service";
import {SessionService} from "../../services/session.service";
import {Classe} from "../../models/classes.models";
import {ClasseService} from "../../services/classe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Filiere} from "../../models/filieres.models";
import {FiliereService} from "../../services/filiere.service";

@Component({
  selector: 'app-timetable-admin',
  templateUrl: './timetable-admin.component.html',
  styleUrls: ['./timetable-admin.component.css']
})
export class TimetableAdminComponent {

  //events:any[]=[]

  events = [
    {
      title: 'DevOps',
      start: '2023-11-27T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'N.Assad',
        location: 'B11',
      },
    },

  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    // events property initially set to an empty array
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventContent: this.customizeEvent.bind(this)
  };

  filteredSessions: Session[] = [];
  newProfFormGroup!: FormGroup;
  ngOnInit(): void {
    this.newProfFormGroup = this.fb.group({
      classe: this.fb.control(null, [Validators.required]),
    });
    this.fetchFilieres();

    console.log(this.calendarOptions)
    this.getSession();

  }
  constructor(private etudeService:EtudiantService,
              private cookieService: CookieService,
              private timeSlotClasseService:TimeTableService,
              private sessionService: SessionService,
              private classeService:ClasseService,
              private fb: FormBuilder,
              private filiereService:FiliereService) {
  }
  filieres:Filiere[]=[]

  fetchFilieres() {
    this.filiereService.getAllFilieres().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Filiere[] = response.content;
          this.filieres = filieres;
          console.log(this.filieres);
          if (this.filieres.length > 0) {
            this.newProfFormGroup.patchValue({ filiere: this.filieres[0] });
          }
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  selectedClasseId: number | null = null; // Initialize it as null

  sessions:Session[]=[];
  etud:any;
  timeSlot:any[]=[];
  getTimes(event:any) {
    this.calendarOptions.events= [];
    const selectedClasseId = event.target.value;
    console.log('Selected Class ID:', selectedClasseId);
    // Call your getTimes method with the selected class ID
    if(selectedClasseId!=null) {
      this.timeSlotClasseService.getAllTimeByClasse(selectedClasseId).subscribe(
        (timeSlotData: any[]) => {
          this.timeSlot = timeSlotData;
          console.log(this.timeSlot);

          let dataList = this.sortDataList();
          console.log(dataList)

          let i: number = 0;

          this.events = []; // Clear events array before populating it with new data
          // Map timeSlot data into FullCalendar events
          dataList.forEach(slot => {
            let eventtopush = {
              title: slot.module.libelle,
              start: slot.day,
              end: slot.day.split("T")[0]+ 'T' + slot.endTime,
              backgroundColor: slot.color,
              textColor: 'black',
              borderColor: 'black',
              extendedProps: {
                instructor: slot.module.enseignant.nom,
                location: slot.salle,
              },
            };
            if (eventtopush.backgroundColor == null){
              if (slot.module.mode == 'On site') {
                eventtopush.title = slot.module.libelle + " (On site)"
                eventtopush.backgroundColor = "#8EACCD"
              } else if (slot.module.mode == 'Hybride') {
                if(i%2 == 1){
                  eventtopush.title = slot.module.libelle + " (On site)"
                  eventtopush.backgroundColor = "#8EACCD"
                }else{
                  eventtopush.title = slot.module.libelle + " (On Remote)"
                  delete eventtopush.extendedProps.location;
                  eventtopush.backgroundColor = "#F6ECA9"
                }
              } else if (slot.module.mode == 'Remote') {
                eventtopush.title = slot.module.libelle + " (On Remote)"
                delete eventtopush.extendedProps.location;
                eventtopush.backgroundColor = "#F6ECA9"
              }
            }

            this.events.push(eventtopush);
            i++;
          });

          console.log(this.events[this.events.length - 1].start.split("T")[1])

          // After populating events, update the calendarOptions
          this.calendarOptions.events = this.events;
        },
        error => {
          console.error('Error fetching time slots:', error);
        }
      );
    }
  }

  getSession() {


    this.sessionService.getSession(Number(this.cookieService.get('userId'))).subscribe(data =>{
      this.sessions = data;
      console.log(this.sessions);

    })
  }


  handleEventClick(arg: EventClickArg) {
    // Handle event click if needed
    console.log('Event clicked:', arg.event.title);
  }

  customizeEvent(arg: EventContentArg) {
    // Customize the style of each event
    const content = document.createElement('div');

    // Display title and start time
    content.innerHTML = `<b>${arg.event.title}</b><br>${arg.event.start!.toLocaleTimeString()}`;
    content.innerHTML += `<b> -- </b> ${arg.event.end!.toLocaleTimeString()}`;

    // Check for additional attributes and display them
    const additionalProps = arg.event.extendedProps;
    if (additionalProps) {
      for (const prop in additionalProps) {
        if (additionalProps.hasOwnProperty(prop) && prop !== 'backgroundColor' && prop !== 'textColor' && prop !== 'borderColor') {
          content.innerHTML += `<br><b>${prop}:</b> ${additionalProps[prop]}`;
        }
      }

      // Apply styling based on the extendedProps
      content.style.backgroundColor = arg.event['backgroundColor'] || 'blue';
      content.style.color = additionalProps['textColor'] || 'black';  // Use square brackets for textColor
      content.style.borderColor = additionalProps['borderColor'] || 'black';  // Use square brackets for borderColor
    }

    content.style.border = 'none';
    content.style.borderRadius = '5px';
    content.style.padding = '5px';
    content.style.width = '100%';
    content.style.height = '100%';

    return { domNodes: [content] };
  }

  sortDataList(): any[] {
    return this.timeSlot.sort((a, b) => {
      const dateA = new Date(a.day);
      const dateB = new Date(b.day);
      return dateA.getTime() - dateB.getTime();
    });
  }
  Classes:Classe[]=[]

  fetchClass(id:any) {
    this.classeService.getClasseByFiliere(id).subscribe(
      (response: any) => {
        console.log(response)
        const classes: Classe[] = response;
        console.log(classes)
        this.Classes = classes;
        console.log(this.Classes);
        if (this.Classes.length > 0) {
          this.newProfFormGroup.patchValue({ classe: this.Classes[0] });
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }





}
