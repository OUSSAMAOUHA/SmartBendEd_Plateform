import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import {ModuleService} from "../../../services/module-service.service";
import {Module} from "../../../models/modules.models";
import {Classe} from "../../../models/classes.models";
import {Filiere} from "../../../models/filieres.models";
import {ClasseService} from "../../../services/classe.service";
import {FiliereService} from "../../../services/filiere.service";

@Component({
  selector: 'app-add-new-coursmodel',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css']
})
export class AddNewModuleComponent implements OnInit {
  newModuleFormGroup!: FormGroup;
  classe: Classe[] = [];
  filiere: Filiere[] = [];
  semesters: any[] = []; // Replace 'any[]' with the actual type of your semesters
  filiereS!: Filiere ;
  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private router: Router,
    private classeService: ClasseService,
    private filiereService:FiliereService
  ) {}

  ngOnInit(): void {
    this.newModuleFormGroup = this.fb.group({
      volumeHoraireOnsite: this.fb.control(null, [Validators.required]),
      volumeHoraireOnRemote: this.fb.control(null, [Validators.required]),
      nbrTD: this.fb.control(null, [Validators.required]),
      nbrTP: this.fb.control(null, [Validators.required]),
      nbrEvaluation: this.fb.control(null, [Validators.required]),
      libelle: this.fb.control(null, [Validators.required]),
      classe: this.fb.control(null, [Validators.required]), // Assuming you have a form control for selecting a classe
      filiere: this.fb.control(null, [Validators.required]),
      semestre: this.fb.control(null, [Validators.required]),

    });
    console.log(this.newModuleFormGroup);
    this.fetchClasse();
    this.fetchFiliere();
  }

  fetchClasse() {
    this.classeService.getClasses1().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Classe[] = response.content;
          this.classe = filieres;
          this.classe.forEach(classeItem => {
            console.log("claaas " + classeItem.id);
          });
          if (this.classe.length > 0) {
            this.newModuleFormGroup.patchValue({ classe: this.classe[0] });
          }
        } else {
          console.error('Unexpected response from the server:', response);
          // Handle the unexpected response here, such as displaying an error message.
        }
      },
      (error) => {
        console.log(error);
        // Handle the error here, such as displaying an error message.
      }
    );
  }

  fetchFiliere() {
    this.filiereService.getAllFilieres().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Filiere[] = response.content;
          this.filiere = filieres;
          this.classe.forEach(classeItem => {
            console.log("claaas " + classeItem.id);
          });
          if (this.classe.length > 0) {
            this.newModuleFormGroup.patchValue({ filiere: this.classe[0] });
          }
        } else {
          console.error('Unexpected response from the server:', response);
          // Handle the unexpected response here, such as displaying an error message.
        }
      },
      (error) => {
        console.log(error);
        // Handle the error here, such as displaying an error message.
      }
    );
  }

  handleAddModule() {
    console.log(this.newModuleFormGroup.value);
    if (this.newModuleFormGroup.valid) {
      const newModule: Module = { ...this.newModuleFormGroup.value }; // Copy form values
      const selectedClasseId: number = +newModule.classe;
      const selectedFiliereId: number = +newModule.filiere;

      // Find the corresponding class and filiere objects
      const filiere = this.filiere.find((fi) => fi.id === selectedFiliereId);

      if (filiere) {
        newModule.filiere = filiere;

        // Create a Classe object with the selected ID
        console.log("class", newModule.classe.id);
        console.log("modulleeee a stocker:")
        console.log(newModule)
        this.moduleService.saveModule(newModule).subscribe({
          next: data => {
            Swal.fire('Success', 'Module added successfully', 'success');
            this.router.navigateByUrl('/coursmodules');
          },
          error: err => {
            console.error(err);
            if (err.error && err.error.message) {
              Swal.fire('Error', err.error.message, 'error');
            } else {
              Swal.fire('Error', 'An error occurred while adding the module', 'error');
            }
          }
        });
      } else {
        Swal.fire('Error', 'Please select a class and filiere before adding the module', 'error');
      }
    } else {
      Swal.fire('Error', 'Please fill in all the fields correctly', 'error');
      console.log(this.newModuleFormGroup.errors);

    }
  }


// This function should be defined to get the selected class ID based on your application logic.
  getSelectedClasseId(): number | null {
    // Replace this with your logic to get the selected class ID, e.g., from a form control or other user input.
    const selectedClasseId: number | null = this.newModuleFormGroup.value.classeId;
    return selectedClasseId;
  }
  selectedFiliereId: number | null = null; // Initialize it as null


  getClassesByFiliere() {
    if (this.selectedFiliereId != null) {
      this.classeService.getClassesByFiliere(this.selectedFiliereId).subscribe(data =>{
        this.classe = data;
        console.log(this.classe)
      },error =>{
        console.log(error)
      })
    }
  }
  getSemestreByFiliere() {
    if (this.selectedFiliereId != null) {
      this.filiereService.getFiliere(this.selectedFiliereId).subscribe(
        (data: Filiere) => {
          this.filiereS = data;
            console.log(this.filiereS.nombreSem);
          this.semesters = this.generateSemesters(this.filiereS.nombreSem);

        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  generateSemesters(numSemesters: number): string[] {
    const semesters: string[] = [];
    for (let i = 1; i <= numSemesters; i++) {
      semesters.push(`S${i}`);
    }
    return semesters;
  }
}
