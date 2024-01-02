import {Component, OnInit} from '@angular/core';
import {CalendarOptions, EventClickArg, EventContentArg} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import {EtudiantService} from "../../services/etudiant.service";
import {CookieService} from "ngx-cookie-service";
import {TimeTableService} from "../../services/timeTable.service";
import {SessionService} from "../../services/session.service";
import {Session} from "../../models/session.model";
import {ProfServiceService} from "../../services/prof-service.service";

@Component({
  selector: 'app-timetable-prof',
  templateUrl: './timetable-prof.component.html',
  styleUrls: ['./timetable-prof.component.css']
})
export class TimetableProfComponent implements OnInit {

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
  ngOnInit(): void {

    console.log(this.calendarOptions)
    this.getEtudByID();

  }
  constructor(private etudeService:ProfServiceService,
              private cookieService: CookieService,
              private timeSlotClasseService:TimeTableService) {
  }

  sessions:Session[]=[];
  etud:any;
  timeSlot:any[]=[];
  getEtudByID() {
    const userId = Number(this.cookieService.get('userId'));


    this.etudeService.getProf(userId).subscribe(
      (etudData: any) => {
        this.etud = etudData;
        console.log(this.etud);

        this.timeSlotClasseService.getAllTimeByProf(this.etud.id).subscribe(
          (timeSlotData: any[]) => {
            this.timeSlot = timeSlotData;
            console.log(this.timeSlot);

            let i: number = 0;
            this.events = []; // Clear events array before populating it with new data
            // Map timeSlot data into FullCalendar events
            this.timeSlot.forEach(slot => {
              let eventtopush = {
                title: slot.module.libelle,
                start: slot.day,
                backgroundColor: slot.color,
                textColor: 'black',
                borderColor: 'black',
                extendedProps: {
                  instructor: slot.module.classe.libelle,
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



  handleEventClick(arg: EventClickArg) {
    // Handle event click if needed
    console.log('Event clicked:', arg.event.title);
  }

  customizeEvent(arg: EventContentArg) {
    // Customize the style of each event
    const content = document.createElement('div');

    // Display title and start time
    content.innerHTML = `<b>${arg.event.title}</b><br>${arg.event.start!.toLocaleTimeString()}`;

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

    return { domNodes: [content] };
  }



}
