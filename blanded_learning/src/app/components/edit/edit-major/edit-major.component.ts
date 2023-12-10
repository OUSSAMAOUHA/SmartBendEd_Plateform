import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {FiliereService} from "../../../services/filiere.service";
import {Filiere} from "../../../models/filieres.models";
import {Departement} from "../../../models/departement.models";
import {DepartmentService} from "../../../services/department.service";
@Component({
  selector: 'app-edit-filiere',
  templateUrl: './edit-major.component.html',
  styleUrls: ['./edit-major.component.css']
})
export class EditMajorComponent implements OnInit {
  editFiliereFormGroup!: FormGroup;
  filiere!: Filiere;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departementService: DepartmentService,
    private dpService: FiliereService

) {
    this.filiere = this.router.getCurrentNavigation()?.extras.state as Filiere;
  }
  ngOnInit(): void {
    this.editFiliereFormGroup = this.fb.group({
      libelle: [''],
      nombreSem: [''],
      chefFiliere: [''],
      departement: ['']
    });
    this.setFormValues();

  }
  setFormValues() {
    if (this.filiere) {
      this.editFiliereFormGroup.patchValue({
        libelle: this.filiere.libelle,
        nombreSem: this.filiere.nombreSem,
        chefFiliere: this.filiere.chefFiliere,
        departement: this.filiere.departement
      });
    }
  }



  handleUpdateFiliere() {

    if (this.editFiliereFormGroup.valid && this.filiere) {
      const updatedFiliere: Filiere = {
        ...this.filiere,
        ...this.editFiliereFormGroup.value
      };
      this.dpService.updateFiliere(updatedFiliere.id,updatedFiliere).subscribe((data) => {
          Swal.fire( 'Succès', 'Filiére modifié avec succès','success');
          this.router.navigateByUrl('/filieres');
        }

      );

    }
  }
}
