import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {ClasseService} from "../../../services/classe.service";
import {Classe} from "../../../models/classes.models";
import {Filiere} from "../../../models/filieres.models";
import {FiliereService} from "../../../services/filiere.service";

@Component({
  selector: 'app-edit-classe',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent implements OnInit {
  editClasseFormGroup!: FormGroup;
  classe!: Classe;
  filieres: Filiere[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clService: ClasseService,
    private filiereService: FiliereService

  ) {
    this.classe = this.router.getCurrentNavigation()?.extras.state as Classe;
  }

  ngOnInit(): void {
    this.editClasseFormGroup = this.fb.group({
      libelle: [''],
      nbrEleves: [''],
      filiere: ['']
    });
    this.setFormValues();
    this.fetchFilieres();
  }
  setFormValues() {
    if (this.classe) {
      this.editClasseFormGroup.patchValue({
        libelle: this.classe.libelle,
        nbrEleves: this.classe.nbrEleves,
        filiere: this.classe.filiere?.id
      });
    }
  }
  fetchFilieres() {
    this.filiereService.getAllFilieres().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Filiere[] = response.content;
          this.filieres = filieres;
          console.log(this.filieres);
          if (this.filieres.length > 0) {
            this.editClasseFormGroup.patchValue({ filiere: this.filieres[0] });
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
    handleUpdateClasse() {
        if (this.editClasseFormGroup.valid && this.classe) {
            const updatedClasse: Classe = {
                ...this.classe,
                ...this.editClasseFormGroup.value
            };
            const selectedFiliereId: number = +updatedClasse.filiere;
            const selectedFiliere = this.filieres.find(filiere => filiere.id === selectedFiliereId);

            if (selectedFiliere) {
                updatedClasse.filiere = selectedFiliere;
                this.clService.updateClasse(updatedClasse.id, updatedClasse,selectedFiliere.id).subscribe((data) => {
                    Swal.fire('Succès', 'Classe modifiée avec succès', 'success');
                    this.router.navigateByUrl('/classes');
                });
            } else {
                Swal.fire('Erreur', 'La filière sélectionnée est introuvable', 'error');
            }
        } else {
            Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
        }
    }


}
