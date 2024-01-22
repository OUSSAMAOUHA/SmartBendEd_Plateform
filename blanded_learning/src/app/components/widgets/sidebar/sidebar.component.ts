import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  active:number=0;
   sidebarItems:any[] = [];

  sidebarAdminItems = [

  {
    link: "/home",
    title: "Home",
    icon: "../assets/img/icons/icons8-home-64.png"
  },
  /*{
    link: "/emploitemps",
    title: "Emploi du temps",
    icon: "fas fa-clipboard-list"
  },*/
    {
      link: "/salles",
      title: "Rooms",
      icon: "../assets/img/icons/icons8-classroom-50.png"
    } ,
    {
      link: "/filieres",
      title: "Majors",
      icon: "../assets/img/icons/icons8-level-50.png"
    },
    {
      link: "/classes",
      title: "Grades",
      icon: "../assets/img/icons/icons8-level-50.png"
    },
    {
      link: "/groups",
      title: "Groups",
      icon: "../assets/img/icons/icons8-level-50.png"
    },
    {
      link: "/profs",
      title: "Professors",
      icon: "../assets/img/icons/icons8-teacher-50.png"
    },
    {
      link: "/etudiant",
      title: "Students",
      icon: "../assets/img/icons/icons8-student-50.png"
    },


    {
      link: "/coursmodules",
      title: "Cours Model",
      icon: "../assets/img/icons/icons8-study-48.png"
    },
    {
      link: "/manip",
      title: "Manipulation",
      icon: "../assets/img/icons/icons8-study-48.png"
    },
    {
      link: "/timeadm",
      title: "Timetables",
      icon: "../assets/img/icons/icons8-study-48.png"
    },



];

sidebarProfItems = [
  {
    link: "/home",
    title: "Home",
    icon: "../assets/img/icons/icons8-home-64.png"
  },
  {
    link: "/emploitemps/prof",
    title: "Emploi du temps",
    icon: "../assets/img/icons/icons8-teacher-50.png"
  },
  {
    link: "/nonDesponibles",
    title: "Constraintes",
    icon: "../assets/img/icons/icons8-teacher-50.png"
  },

]

  sidebarEtudItems = [
    {
      link: "/home",
      title: "Home",
      icon: "../assets/img/icons/icons8-home-64.png"
    },
    {
      link: "/emploitemps",
      title: "Emploi du temps",
      icon: "../assets/img/icons/icons8-teacher-50.png"
    },
    {
      link: "/crit/add",
      title: "Constraintes",
      icon: "../assets/img/icons/icons8-student-50.png"
    },

  ]
  constructor(private cookieService: CookieService) { }

  handleChangeBars(index: number): void {
    this.active = index;
  }


  ngOnInit(): void {

    if(this.cookieService.get('role') == "Administrateur"){
     this.sidebarItems= this.sidebarAdminItems;
    }else if(this.cookieService.get('role') == "Etudiant"){
     this.sidebarItems= this.sidebarEtudItems;
    }else{
      this.sidebarItems= this.sidebarProfItems;
    }

}
}
