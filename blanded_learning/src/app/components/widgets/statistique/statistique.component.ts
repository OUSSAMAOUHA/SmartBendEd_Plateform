import { SalleService } from 'src/app/services/salle.service';
import { DepartmentService } from 'src/app/services/department.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import { EtudiantService } from 'src/app/services/etud-service.service';

import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/services/classe.service';
import { FiliereService } from 'src/app/services/filiere.service';



@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent  implements OnInit
{
  nombreProfs:number=0;
  nombreEtudiants:number=0;
  nombreClasses:number=0;
  nombreFilieres:number=0;
  nombreSalles:number=0;


    constructor(private etudiantService:EtudiantService,private prfService:ProfServiceService,private clsService:ClasseService,private filiereService:FiliereService,private salleService: SalleService) { }

    ngOnInit(): void {
      this.getNbEtudiants();
      this.getNbProfs();
      this.getNbClasses();
      this.getNbFilieres();

      this.getNbSalles();
    }

    getNbProfs() {
      this.prfService.getProfs(0,6).subscribe(
      (data) => {
        this.nombreProfs= data.totalElements;
      }
    );
    }
  getNbEtudiants() {
    this.etudiantService.getEtudiants(0,6).subscribe(
      (data) => {
        this.nombreEtudiants= data.totalElements;
      }
    );
  }
    getNbClasses() {
      this.clsService.getClasses(0,6).subscribe(
      (data) => {
        this.nombreClasses= data.totalElements;
      }
    );
    }
  getNbFilieres() {
    this.filiereService.getFilieres(0,6).subscribe(
      (data) => {
        this.nombreFilieres= data.totalElements;
      }
    );
  }
    getNbSalles() {
      this.salleService.getSalles(0,6).subscribe(
      (data) => {
        this.nombreSalles= data.totalElements;
      }
    );
    }


}
