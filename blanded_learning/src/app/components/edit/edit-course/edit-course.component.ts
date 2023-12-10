import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import Swal from 'sweetalert2';
import {Module} from "../../../models/modules.models";
import {ModuleService} from "../../../services/module-service.service";
import {Classe} from "../../../models/classes.models";
import {ClasseService} from "../../../services/classe.service";
import {Filiere} from "../../../models/filieres.models";
import {FiliereService} from "../../../services/filiere.service";

@Component({
  selector: 'app-edit-coursmodules',
  templateUrl: './edit-coursmodules.component.html', // Update the HTML template file name
  styleUrls: ['./edit-coursmodules.component.css'] // Update the CSS file name
})
export class EditModuleComponent implements OnInit {
  editModuleFormGroup!: FormGroup;
  module!: Module;
  classe: Classe[] = [];
  semesters: string[] = [];
  filiereS!: Filiere;
  filiere: Filiere[] = [];

  constructor( private moduleService: ModuleService,
               private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private classeService: ClasseService,
               private filiereService: FiliereService,
  ) {
    this.module = this.router.getCurrentNavigation()?.extras.state as Module;
  }

  ngOnInit(): void {
    this.editModuleFormGroup = this.fb.group({
      volumeHoraireOnsite: [''],
      volumeHoraireOnRemote: [''],
      nbrTD: [''],
      nbrTP: [''],
      nbrEvaluation: [''],
      libelle: [''],
      classe: [''],
      filiere: [''],
      semestre: [''],
    });

    this.fetchClasse();
    this.setFormValues();
    this.fetchFiliere();
  }

  setFormValues() {
    if (this.module) {
      this.editModuleFormGroup.patchValue({
        volumeHoraireOnsite: this.module.volumeHoraireOnsite,
        volumeHoraireOnRemote: this.module.volumeHoraireOnRemote,
        nbrTD: this.module.nbrTD,
        nbrTP: this.module.nbrTP,
        nbrEvaluation: this.module.nbrEvaluation,
        libelle: this.module.libelle,
        classe: this.module.classe?.id,
        filiere: this.module.filiere?.id,
        semestre: this.module.semestre,
      });
    }
  }
  selectedFiliereId: number | null = null; // Initialize it as null

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
            this.editModuleFormGroup.patchValue({ filiere: this.classe[0] });
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
            this.editModuleFormGroup.patchValue({ filiere: this.classe[0] });
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
  handleUpdateModule() {
    console.log(this.editModuleFormGroup.value);
    if (this.editModuleFormGroup.valid && this.module) {
      const updatedModule: Module = { ...this.module, ...this.editModuleFormGroup.value };

      const selectedClasseId: number = +updatedModule.classe;
      const selectedFiliereId: number = +updatedModule.filiere;

      // Find the corresponding class and filiere objects
      const classe = this.classe.find((cl) => cl.id === selectedClasseId);
      const filiere = this.filiere.find((fi) => fi.id === selectedFiliereId);

      if (classe && filiere) {
        updatedModule.classe = classe;

        this.moduleService.updateModule(updatedModule.id, updatedModule, selectedClasseId, selectedFiliereId)
          .subscribe(
            () => {
              Swal.fire('Success', 'Module updated successfully', 'success');
              this.router.navigateByUrl('/coursmodules');
            },
            (error) => {
              console.error(error);

              if (error.status === 400) {
                // Log the specific error details
                console.error('Server responded with a 400 Bad Request:', error.error);
                Swal.fire('Error', 'Bad request. Please check your data and try again.', 'error');
              } else {
                Swal.fire('Error', 'An error occurred while updating the module', 'error');
              }
            }
          );

      } else {
        Swal.fire('Error', 'Please select a class and a major before updating the module', 'error');
      }
    } else {
      Swal.fire('Error', 'Please fill in all the fields correctly', 'error');
    }
  }


}
