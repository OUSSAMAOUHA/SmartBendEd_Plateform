import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {EtudiantService} from "../../services/etudiant.service";
import {CookieService} from "ngx-cookie-service";
import {TimeTableService} from "../../services/timeTable.service";
import {SessionService} from "../../services/session.service";
import {Session} from "../../models/session.model";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

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
  ngOnInit(): void {

    console.log(this.calendarOptions)
    this.getEtudByID();
    this.getSession();

  }
  constructor(private etudeService:EtudiantService,
              private cookieService: CookieService,
              private timeSlotClasseService:TimeTableService,
              private sessionService: SessionService) {
  }

  sessions:Session[]=[];
  etud:any;
  timeSlot:any[]=[];
  getEtudByID() {
    const userId = Number(this.cookieService.get('userId'));


    this.etudeService.getById(userId).subscribe(
      (etudData: any) => {
        this.etud = etudData;
        console.log(this.etud);

        this.timeSlotClasseService.getAllTimeByClasse(this.etud.classe.id).subscribe(
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
              this.filterSessionsByModule(slot.module.id)
              console.log(this.filteredSessions)
              if (this.filteredSessions.length ==0){
                this.filteredSessions = this.sessions;
              }
              if (eventtopush.backgroundColor == null){
                if (this.filteredSessions[0].mode == 'On site') {
                  eventtopush.title = slot.module.libelle + " (On site)"
                  eventtopush.backgroundColor = "#8EACCD"
                } else if (this.filteredSessions[0].mode == 'Hybride') {
                  if(i%2 == 1){
                    eventtopush.title = slot.module.libelle + " (On site)"
                    eventtopush.backgroundColor = "#8EACCD"
                  }else{
                    eventtopush.title = slot.module.libelle + " (On Remote)"
                    delete eventtopush.extendedProps.location;
                    eventtopush.backgroundColor = "#F6ECA9"
                  }
                } else if (this.filteredSessions[0].mode == 'Remote') {
                  eventtopush.title = slot.module.libelle + " (On Remote)"
                  delete eventtopush.extendedProps.location;
                  eventtopush.backgroundColor = "#F6ECA9"
                }
                if(this.events[this.events.length-1]?.backgroundColor=="#CD8D7A"){
                  eventtopush.backgroundColor = "#8EACCD";
                }
              }else {
                if(eventtopush.backgroundColor =="#8EACCD"){
                  eventtopush.title = slot.module.libelle + " (On site)"
                }
                if(eventtopush.backgroundColor =="#CD8D7A"){
                  eventtopush.title = slot.module.libelle + " (Eval)"
                }
              }
              if(this.events[this.events.length-1]?.backgroundColor!="#CD8D7A" && eventtopush.backgroundColor!="#CD8D7A") {
                if (this.events[this.events.length - 1]?.start.split("T")[1] == "08:30:00") {
                  eventtopush.backgroundColor = this.events[this.events.length - 1]?.backgroundColor;
                } else if (this.events[this.events.length - 1]?.start.split("T")[1] == "12:30:00") {
                  eventtopush.backgroundColor = this.events[this.events.length - 1]?.backgroundColor;
                } else if (this.events[this.events.length - 1]?.start.split("T")[1] == "13:30:00") {
                  eventtopush.backgroundColor = this.events[this.events.length - 1]?.backgroundColor;
                }
              }
              if(eventtopush.backgroundColor =='#8EACCD'){
                eventtopush.title = slot.module.libelle + " (On site)"
              }else if (eventtopush.backgroundColor =='#F6ECA9'){
                eventtopush.title = slot.module.libelle + " (On Remote)"

              }
              this.events.push(eventtopush);
              i++;
            });

            console.log(this.events[this.events.length-1].start.split("T")[1])

            // After populating events, update the calendarOptions
            this.calendarOptions.events = this.events;
          },
          error => {
            console.error('Error fetching time slots:', error);
          }
        );
      },
      error => {
        console.error('Error fetching etud data:', error);
      }
    );
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

  filterSessionsByModule(id :number) {
    this.filteredSessions = [];
      this.filteredSessions = this.sessions.filter(session => session.module.id === id);
  }





}
