import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Classe} from "../../../models/classes.models";
import {Filiere} from "../../../models/filieres.models";
import {ActivatedRoute, Router} from "@angular/router";
import {ClasseService} from "../../../services/classe.service";
import {FiliereService} from "../../../services/filiere.service";
import Swal from "sweetalert2";
import {Groupe} from "../../../models/groupe.model";
import {GroupeService} from "../../../services/groupe.service";

@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.component.html',
  styleUrls: ['./edit-groups.component.css']
})
export class EditGroupsComponent {
  editGroupFormGroup!: FormGroup;
  groupe!: Groupe;
  Classes: Classe[] = [];
  filieres: Filiere[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private groupeService: GroupeService,
    private classeService: ClasseService,
    private filiereService: FiliereService

  ) {
    this.groupe = this.router.getCurrentNavigation()?.extras.state as Groupe;
  }


  ngOnInit(): void {
    this.editGroupFormGroup = this.fb.group({
      libelle: [''],
      filiere:[''],
      classe: ['']
    });
    this.setFormValues();
    this.fetchFilieres();
  }
  setFormValues() {
    if (this.groupe) {
      this.editGroupFormGroup.patchValue({
        libelle: this.groupe.libelle,
        classe: this.groupe.classe?.id
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
            this.editGroupFormGroup.patchValue({ filiere: this.filieres[0] });
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
  fetchClass(id:any) {
    this.classeService.getClasseByFiliere(id).subscribe(
      (response: any) => {
        console.log(response)
          const classes: Classe[] = response;
          console.log(classes)
          this.Classes = classes;
          console.log(this.Classes);
          if (this.Classes.length > 0) {
            this.editGroupFormGroup.patchValue({ classe: this.Classes[0] });
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleUpdateGroup() {
    if (this.editGroupFormGroup.valid && this.groupe) {
      const updatedGroupe: Groupe = {
        ...this.groupe,
        ...this.editGroupFormGroup.value
      };
      console.log(this.editGroupFormGroup)
      const selectedClasseId: number = +updatedGroupe.classe;
      const selectedClasse = this.Classes.find(classe => classe.id === selectedClasseId);


      if (selectedClasse) {
        updatedGroupe.classe = selectedClasse;
        this.groupeService.saveGroupe(updatedGroupe).subscribe((data) => {
          Swal.fire('Success', 'Groupe modified successfuly', 'success');
          this.router.navigateByUrl('/groups');
        });
      } else {
        Swal.fire('Error', 'can not find the groupe', 'error');
      }
    } else {
      Swal.fire('Error', 'Please complete all fields of the form correctly', 'error');
    }
  }
}
