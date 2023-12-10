import { Component } from '@angular/core';
import {Filiere} from "../../../models/filieres.models";
import {Classe} from "../../../models/classes.models";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Groupe} from "../../../models/groupe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupeService} from "../../../services/groupe.service";
import {ClasseService} from "../../../services/classe.service";
import {FiliereService} from "../../../services/filiere.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {

  newGroupFormGroup!: FormGroup;
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
    this.newGroupFormGroup = this.fb.group({
      libelle: [''],
      classe: ['']
    });
    this.fetchFilieres();
  }

  fetchFilieres() {
    this.filiereService.getAllFilieres().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Filiere[] = response.content;
          this.filieres = filieres;
          console.log(this.filieres);
          if (this.filieres.length > 0) {
            this.newGroupFormGroup.patchValue({ filiere: this.filieres[0] });
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

  handleAddGroup() {
    if (this.newGroupFormGroup.valid) {
      const newgroup: Groupe = this.newGroupFormGroup.value;
      this.groupe = this.newGroupFormGroup.value;

      // Find the selected filière object based on the selected ID
      const selectedClasseId: number = +newgroup.classe; // Use a type assertion if necessary

      const selectedClasse = this.Classes.find(classe => classe.id === selectedClasseId);

      if (selectedClasse) {
        // Update the 'filiere' property with the selected filière object
        newgroup.classe = selectedClasse;

        console.log('Adding new group:', newgroup);

        // Send the selected filiereId to the backend
        const filiereIdToSend = selectedClasse.id;

        this.groupeService.saveGroupe(newgroup).subscribe(
          (data) => {
            console.log('Response data:', data);
            Swal.fire('Succès', 'Classe ajoutée avec succès', 'success');
            // Reset the form
            this.newGroupFormGroup.reset();
          },
          (error) => {
            console.log('Error status:', error.status);
            console.log('Error message:', error.message);
            console.log('Error details:', error.error);

            Swal.fire(
              'error',
              'error while adding the groupe' + error.message,
              'error'
            );
          }
        );
      } else {
        Swal.fire(
          'error',
          'The selected Class cannot be found',
          'error'
        );
      }
    } else {
      Swal.fire(
        'error',
        'Please complete all fields of the form correctly',
        'error'
      );
    }
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
          this.newGroupFormGroup.patchValue({ classe: this.Classes[0] });
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
