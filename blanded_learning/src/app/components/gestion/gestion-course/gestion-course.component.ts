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
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestion-module',
  templateUrl: './gestion-course.component.html',
  styleUrls: ['./gestion-course.component.css']
})
export class GestionModuleComponent implements OnInit {
  modules: Module[] = []; // Initialiser le tableau modules

  groupes:Groupe[]=[];

  modulles :Module[] = [];
  // New pagination-related properties

  displayedModules: Module[] = [];

  module: Module | undefined;
  modulesS: Module [] = [];


  profs:Prof[]=[];

  errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalelements:number=0;
  displayedPages: number[] = [];

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

    this.handleSearchModules();
    // Appel de la fonction pour récupérer les modules depuis l'API
    this.getAllProf();
    this.fetchFilieres();

  }

  getAllProf(){
    this.profService.getProfss().subscribe(data =>{
      this.profs = data;
      console.log(this.profs);
    })
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
        this.moduleService.deleteModule(module.id).subscribe(
          () => {
            console.log('Module deleted successfully!');
            const index = this.modules.findIndex((m) => m.id === module.id);
            if (index !== -1) {
              this.modules.splice(index, 1); // Remove deleted module from the array
            }
            this.handleSearchModules(); // Reload the modules after deletion
          },
          (error) => {
            console.error('Error deleting the module:', error);
            // Handle error scenario if needed
          }
        );
      }
    });
  }

  affect(form: NgForm) {
    console.log(form.value)
    // You can also access the form object if needed
    let moduleeee:Module = form.value.module;
    form.value.module.enseignant = form.value.prof
    console.log(moduleeee)
    this.moduleService.saveModule(moduleeee).subscribe(data =>{
      console.log(data)
      Swal.fire('Success', 'Module Affected successfuly', 'success');
      const buttonElement = this.close.nativeElement as HTMLButtonElement;
      buttonElement.click();
      form.reset();
    },error => {
      console.log(error)
      Swal.fire('Error', 'erreuur', 'error');
      const buttonElement = this.close.nativeElement as HTMLButtonElement;
      buttonElement.click();
      form.reset();
    })
    // this.affectservice.saveAffect(affect).subscribe(data =>{
    //   console.log(data)
    //   Swal.fire('Success', 'Module Affected successfuly', 'success');
    //     const buttonElement = this.close.nativeElement as HTMLButtonElement;
    //     buttonElement.click();
    //     form.reset();
    //
    // },
    //   err => {
    //   console.error(err);
    //   if (err.error && err.error.message) {
    //     Swal.fire('Error', err.error.message, 'error');
    //   } else {
    //     Swal.fire('Error', 'erreuur', 'error');
    //   }
    //     const buttonElement = this.close.nativeElement as HTMLButtonElement;
    //     buttonElement.click();
    //     form.reset()
    // }
    // )
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

  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.handleSearchModules();
  }
  handleSearchModules(): void {
    this.moduleService
      .searchModules(this.searchFormGroup.value.keyword, this.page, this.size)
      .subscribe(
        (data) => {
          this.modules = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = data.number;
          this.setDisplayedPages();
        },
        (error) => {
          this.errorMessage = error;
          console.log(error);
        }
      );
  }

  setDisplayedPages(): void {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (
      let i = startPage;
      i < startPage + 3 && i < this.totalPages;
      i++
    ) {
      this.displayedPages.push(i);
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.page = page;
    this.handleSearchModules();
  }

  goToPreviousSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage;
      this.handleSearchModules();
    }
  }

  goToNextSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage;
      this.handleSearchModules();
    }
  }


}
