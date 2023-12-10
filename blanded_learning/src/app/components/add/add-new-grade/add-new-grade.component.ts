import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Classe } from '../../../models/classes.models';
import { ClasseService } from '../../../services/classe.service';
import { Filiere } from '../../../models/filieres.models';
import { FiliereService } from '../../../services/filiere.service';
import {Departement} from "../../../models/departement.models";
import {Groupe} from "../../../models/groupe.model";
import {GroupeService} from "../../../services/groupe.service";

@Component({
  selector: 'app-add-new-classe',
  templateUrl: './add-new-grade.component.html',
  styleUrls: ['./add-new-grade.component.css']
})
export class AddNewGradeComponent implements OnInit {
  newClassFormGroup!: FormGroup;
  filieres: Filiere[] = [];
  classe!:Classe;
  @ViewChild('close', { static: true }) close!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private clService: ClasseService,
    private filiereService: FiliereService,
    private groupeService:GroupeService
  ) {}

  ngOnInit(): void {
    this.newClassFormGroup = this.fb.group({
        libelle: ['', Validators.required],
        nbrEleves: [null, Validators.required],
      filiere: [null, Validators.required],
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
                          this.newClassFormGroup.patchValue({ filiere: this.filieres[0] });
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




  handleAddClasse() {
    if (this.newClassFormGroup.valid) {
      const newClasse: Classe = this.newClassFormGroup.value;
      this.classe = this.newClassFormGroup.value;

      // Find the selected filière object based on the selected ID
      const selectedFiliereId: number = +newClasse.filiere; // Use a type assertion if necessary

      const selectedFiliere = this.filieres.find(filiere => filiere.id === selectedFiliereId);

      if (selectedFiliere) {
        // Update the 'filiere' property with the selected filière object
        newClasse.filiere = selectedFiliere;

        console.log('Adding new class:', newClasse);

        // Send the selected filiereId to the backend
        const filiereIdToSend = selectedFiliere.id;

        this.clService.saveClasse(newClasse, filiereIdToSend).subscribe(
          (data) => {
            console.log('Response data:', data);
            this.classe = data;
            const obj = new Groupe();
            obj.classe = this.classe
            obj.libelle ='gr1';
            this.groupeService.saveGroupe(obj).subscribe(
              (data) => {
                console.log("grouppe :")
                console.log(data);
              },
              (error) => {
                console.log(error)
              }
            );
            Swal.fire('success', 'Class added successfully with a default groupe GR1 ', 'success');
            // Reset the form
            this.newClassFormGroup.reset();
          },
          (error) => {
            console.log('Error status:', error.status);
            console.log('Error message:', error.message);
            console.log('Error details:', error.error);

            Swal.fire(
              'Erreur',
              'Erreur lors de l\'ajout de la classe: ' + error.message,
              'error'
            );
          }
        );
      } else {
        Swal.fire(
          'Erreur',
          'La filière sélectionnée est introuvable',
          'error'
        );
      }
    } else {
      Swal.fire(
        'Erreur',
        'Veuillez remplir correctement tous les champs du formulaire',
        'error'
      );
    }
  }

  groupes:Groupe[]=[];

  addGroupes() {
    if(this.groupes.length !=0){
      console.log(this.groupes)
      this.groupes.forEach(obj =>{
        this.groupeService.saveGroupe(obj).subscribe(
          (data) => {
            console.log('Response data:', data);
            Swal.fire('success', 'Group added successfuly', 'success');
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
      })
      Swal.fire('Success', 'groups added successfuly', 'success');
      const buttonElement = this.close.nativeElement as HTMLButtonElement;
      buttonElement.click();
      this.groupes = []
    }
  }

  addGroup(groupe: NgForm) {
    let groupefrom = groupe.value;
    let groupeee = new Groupe();
    groupeee.libelle = groupefrom.libelle;
    groupeee.classe= this.classe;
    this.groupes.push(groupeee);
    groupe.reset();
  }
  supprimerGroupe(groupe: Groupe) {
    let index = this.groupes.indexOf(groupe)
    this.groupes.splice(index, 1);
  }

}
