import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {EtudiantService} from "../../services/etudiant.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
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
    {
      title: 'Encadrement',
      start: '2023-11-27T10:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'm.Lachgar',
        location: 'home',
      },
    },
    {
      title: 'microservices',
      start: '2023-11-28T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'c.baidada',
        location: 'A1',
      },
    },
    {
      title: 'fouille et visualisation big data',
      start: '2023-11-28T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'f.kalloubi',
        location: 'A1',
      },
    },
    {
      title: 'architecture BigData',
      start: '2023-11-29T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'f.kalloubi',
        location: 'A1',
      },
    },
    {
      title: 'securité cloud',
      start: '2023-11-29T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'm.Boujnouni',
        location: 'A1',
      },
    },
    {
      title: 'Aassurance qualité logiciel',
      start: '2023-11-30T10:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'A.hannani',
        location: 'A1',
      },
    },
    {
      title: 'recherche scientifique',
      start: '2023-12-01T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'c.Razouk',
        location: 'A2',
      },
    },
    {
      title: "recherche d'emploie",
      start: '2023-12-01T14:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'JADA',
        location: 'Amphi 1',
      },
    },
    {
      title: 'DevOps',
      start: '2023-12-04T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'N.Assad',
        location: 'B11',
      },
    },
    {
      title: 'Encadrement',
      start: '2023-12-04T10:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'm.Lachgar',
        location: 'home',
      },
    },
    {
      title: 'microservices',
      start: '2023-12-05T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'c.baidada',
        location: 'A1',
      },
    },
    {
      title: 'fouille et visualisation big data',
      start: '2023-12-05T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'f.kalloubi',
        location: 'A1',
      },
    },
    {
      title: 'architecture BigData',
      start: '2023-12-06T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'f.kalloubi',
        location: 'A1',
      },
    },
    {
      title: 'securité cloud',
      start: '2023-12-06T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'm.Boujnouni',
        location: 'A1',
      },
    },
    {
      title: 'Aassurance qualité logiciel',
      start: '2023-12-07T10:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'A.hannani',
        location: 'A1',
      },
    },
    {
      title: 'recherche scientifique',
      start: '2023-12-08T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'c.Razouk',
        location: 'A2',
      },
    },
    {
      title: "recherche d'emploie",
      start: '2023-12-08T14:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'JADA',
        location: 'Amphi 1',
      },
    },
    {
      title: 'DevOps',
      start: '2023-12-11T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'N.Assad',
        location: 'B11',
      },
    },
    {
      title: 'Encadrement',
      start: '2023-12-11T10:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'm.Lachgar',
        location: 'home',
      },
    },
    {
      title: 'microservices',
      start: '2023-12-12T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'c.baidada',
        location: 'A1',
      },
    },
    {
      title: 'fouille et visualisation big data',
      start: '2023-12-12T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'f.kalloubi',
        location: 'A1',
      },
    },
    {
      title: 'architecture BigData',
      start: '2023-12-13T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'f.kalloubi',
        location: 'A1',
      },
    },
    {
      title: 'securité cloud',
      start: '2023-12-13T14:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'm.Boujnouni',
        location: 'A1',
      },
    },
    {
      title: 'Aassurance qualité logiciel',
      start: '2023-12-14T10:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'A.hannani',
        location: 'A1',
      },
    },
    {
      title: 'recherche scientifique',
      start: '2023-12-15T08:30:00',
      backgroundColor: '#8EACCD',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'c.Razouk',
        location: 'A2',
      },
    },
    {
      title: "recherche d'emploie",
      start: '2023-12-15T14:30:00',
      backgroundColor: '#D7E5CA',
      textColor: 'white',
      borderColor: 'black',
      extendedProps: {
        instructor: 'JADA',
        location: 'Amphi 1',
      },
    },
    {
      title: 'architecture BigData',
      start: '2023-12-26T08:30:00',
      backgroundColor: '#F9F3CC',
      textColor: 'black',
      borderColor: 'black',
      extendedProps: {
        instructor: 'f.kalloubi',
        location: 'A1',
      },
    },
    {
      title: 'securité cloud',
      start: '2023-12-27T14:30:00',
      backgroundColor: '#F9F3CC',
      textColor: 'black',
      borderColor: 'black',
      extendedProps: {
        instructor: 'm.Boujnouni',
        location: 'A1',
      },
    },
    {
      title: 'Aassurance qualité logiciel',
      start: '2023-12-28T10:30:00',
      backgroundColor: '#F9F3CC',
      textColor: 'black',
      borderColor: 'black',
      extendedProps: {
        instructor: 'A.hannani',
        location: 'A1',
      },
    },
    {
      title: 'recherche scientifique',
      start: '2023-12-28T08:30:00',
      backgroundColor: '#F9F3CC',
      textColor: 'black',
      borderColor: 'black',
      extendedProps: {
        instructor: 'c.Razouk',
        location: 'A2',
      },
    },
    {
      title: "recherche d'emploie",
      start: '2023-12-27T14:30:00',
      backgroundColor: '#F9F3CC',
      textColor: 'black',
      borderColor: 'black',
      extendedProps: {
        instructor: 'JADA',
        location: 'Amphi 1',
      },
    },
    { }
    // Add more events as needed
  ];

  ngOnInit(): void {
    this.getEtudByID()
  }
  constructor(private etudeService:EtudiantService,  private cookieService: CookieService) {
  }
  etud:any;
  getEtudByID(){
    this.etudeService.getById(Number(this.cookieService.get('userId'))).subscribe(data =>{
      this.etud = data;
      console.log(this.etud)
    }, error => {
      console.log(error)
    })
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: this.events,
    eventClick: this.handleEventClick.bind(this),
    eventContent: this.customizeEvent.bind(this)
  };

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
