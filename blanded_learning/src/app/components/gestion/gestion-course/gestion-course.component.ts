import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Module } from "../../../models/modules.models";
import { ModuleService } from "../../../services/module-service.service";
import {ProfServiceService} from "../../../services/prof-service.service";
import {Prof} from "../../../models/prof.models";
import {Groupe} from "../../../models/groupe.model";
import {GroupeService} from "../../../services/groupe.service";
import {AffectationModuleGroupeTeacher} from "../../../models/affect.model";
import {AffectService} from "../../../services/affect.service";
import {Filiere} from "../../../models/filieres.models";
import {Classe} from "../../../models/classes.models";
import {FiliereService} from "../../../services/filiere.service";
import {ClasseService} from "../../../services/classe.service";

@Component({
  selector: 'app-gestion-module',
  templateUrl: './gestion-course.component.html',
  styleUrls: ['./gestion-course.component.css']
})
export class GestionModuleComponent implements OnInit {
  modules: Module[] = []; // Initialiser le tableau modules

  groupes:Groupe[]=[];

  modulles :Module[] = [];

  module: Module | undefined;

  profs:Prof[]=[];

  errorMessage: string = '';
  searchFormGroup!: FormGroup;

  @ViewChild('close', { static: true }) close!: ElementRef;

  constructor(
    private moduleService: ModuleService,
    private fb: FormBuilder,
    private router: Router,
    private profService:ProfServiceService,
    private classeService:ClasseService,
    private groupeService:GroupeService,
    private filiereService:FiliereService,private renderer: Renderer2, private groupeservice:GroupeService,private affectservice:AffectService,
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });

    // Appel de la fonction pour récupérer les modules depuis l'API
    this.loadModules();
    this.getAllProf();
    this.fetchFilieres();
  }

  getAllProf(){
    this.profService.getProfss().subscribe(data =>{
      this.profs = data;
      console.log(this.profs);
    })
  }



  // Fonction pour récupérer les modules depuis l'API
  loadModules() {
    this.moduleService.getModules().subscribe(
      (data: Module[]) => {
        this.modules = data; //
        console.log(" data0   "+data[0].libelle)// Mettre les données récupérées dans le tableau modules
        console.log(" data1   "+data[1].libelle)// Mettre les données récupérées dans le tableau modules
        console.log(" data2   "+data[2].libelle)// Mettre les données récupérées dans le tableau modules
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des modules.';
        console.error(error);
      }
    );
  }

  getGroupesByClasse(id:any) {
      this.groupeService.getByClasse(id).subscribe(data =>{
        this.groupes = data;
        console.log(this.groupes)
      },error =>{
        console.log(error)
      })
  }

  loadModulles(id:any) {
    console.log(id)
    console.log("-----------------------------")
    this.moduleService.getModullesByClasse(id).subscribe(
      (data: Module[]) => {
        this.modulles = data; //
        console.log(this.modulles)
      },
      (error) => {
        this.errorMessage = 'Error retrieving modules.';
        console.error(error);
      }
    );
  }

  filieres:Filiere[]=[];
  fetchFilieres() {


    this.filiereService.getAllFilieres().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Filiere[] = response.content;
          this.filieres = filieres;
          console.log(this.filieres);
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  Classes:Classe[]=[];
  fetchClass(id:any) {
    this.classeService.getClasseByFiliere(id).subscribe(
      (response: any) => {
        console.log(response)
        const classes: Classe[] = response;
        console.log(classes)
        this.Classes = classes;
        console.log(this.Classes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleEditModule(module: Module) {
    // Redirect to the module edit page
    this.router.navigateByUrl('/coursmodules/edit', { state: module });
  }

  handleDeleteModule(module: Module) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.moduleService.deleteModule(module.id).subscribe(() => {
          // Remove the deleted module from the list
          this.modules = this.modules.filter((m) => m.id !== module.id);
        });
      }
    });
  }
  affect(form: NgForm) {
    // You can also access the form object if needed
    let affect:AffectationModuleGroupeTeacher = new AffectationModuleGroupeTeacher();
    affect.enseignant = form.value.prof;
    affect.module = form.value.module;
    affect.groupe = form.value.groupe;
    console.log(affect)
    this.affectservice.saveAffect(affect).subscribe(data =>{
      console.log(data)
      Swal.fire('Success', 'Module Affected successfuly', 'success');
        const buttonElement = this.close.nativeElement as HTMLButtonElement;
        buttonElement.click();
        form.reset();

    },
      err => {
      console.error(err);
      if (err.error && err.error.message) {
        Swal.fire('Error', err.error.message, 'error');
      } else {
        Swal.fire('Error', 'erreuur', 'error');
      }
        const buttonElement = this.close.nativeElement as HTMLButtonElement;
        buttonElement.click();
        form.reset()
    }
    )
  }
  hideModal() {
    const modal = this.renderer.selectRootElement('#exampleModal');
    this.renderer.setProperty(modal, 'hidden', true);
  }
  selectedModule: any | null = null;
  selectedClasseId: any;

  getGroupes(){
    console.log(this.selectedModule.id)
    if(this.selectedModule.id !=null){
      this.groupeservice.getByModule(this.selectedModule.id).subscribe(data =>{
        this.groupes = data;
        console.log(this.groupes)
      },error => {
        console.log(error)
      })
    }

  }
}
