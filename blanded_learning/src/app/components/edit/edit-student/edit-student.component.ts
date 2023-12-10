import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Prof} from "../../../models/prof.models";
import {Etudiant} from "../../../models/etudiant.model";
import {ProfServiceService} from "../../../services/prof-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {EtudiantService} from "../../../services/etudiant.service";
import {Classe} from "../../../models/classes.models";
import {ClasseService} from "../../../services/classe.service";
import {GroupeService} from "../../../services/groupe.service";
import {Groupe} from "../../../models/groupe.model";
import {Filiere} from "../../../models/filieres.models";
import {FiliereService} from "../../../services/filiere.service";

@Component({
  selector: 'app-edit-etud',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {

  editEtudGoup!: FormGroup;
  etud!: Etudiant;
  Classes: Classe[] = [];

  constructor(private etudService: EtudiantService,
              private fb: FormBuilder,
              private router: Router,private route : ActivatedRoute,
              private classeService:ClasseService,
              private groupeService:GroupeService,
              private filiereService:FiliereService) {
    this.etud=this.router.getCurrentNavigation()?.extras.state as Etudiant;
  }

  ngOnInit(): void {
    console.log(this.etud)
    this.editEtudGoup = this.fb.group({
      prenom: [''],
      nom: [''],
      civilite: [''],
      cne: [''],
      email: [''],
      specialite: [''],
      tel: [''],
      login: [''],
      password: [''],
      classe: [''],
      groupe:[''],
      filiere:[''],

    });

    this.selectedClasseId = this.etud.classe.id
    this.setFormValues();
    this.fetchFilieres();
    this.fetchClass(this.etud.classe.filiere.id)
    this.getGroupesByClasse();
  }
  fetchClasse() {
    this.classeService.getClasses1().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Classe[] = response.content;
          this.Classes = filieres;
          this.Classes.forEach(classeItem => {
            console.log("claaas " + classeItem.id);
          });
          if (this.Classes.length > 0) {
            this.editEtudGoup.patchValue({ classe: this.Classes[0] });
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
  selectedClasseId: number | null = null; // Initialize it as null
  groupes:Groupe[]=[]
  getGroupesByClasse() {
    if (this.selectedClasseId != null) {
      this.groupeService.getByClasse(this.selectedClasseId).subscribe(data =>{
        this.groupes = data;
        console.log(this.groupes)
        if (this.groupes.length > 0) {
          this.editEtudGoup.patchValue({ groupe: this.etud.groupe.id });
        }
      },error =>{
        console.log(error)
      })
    }
  }
  filieres:Filiere[]=[];
  fetchFilieres() {
    this.filiereService.getAllFilieres().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Filiere[] = response.content;
          this.filieres = filieres;
          console.log(this.filieres);
          if (this.filieres.length > 0) {
            this.editEtudGoup.patchValue({ filiere: this.etud.classe.filiere.id });
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
          this.editEtudGoup.patchValue({ classe: this.selectedClasseId });
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setFormValues() {
    if (this.etud) {
      this.editEtudGoup.patchValue({
        prenom: this.etud.prenom,
        nom: this.etud.nom,
        civilite: this.etud.civilite,
        cne: this.etud.cne,
        email: this.etud.email,
        login: this.etud.login,
        tel:this.etud.tel,
        password: this.etud.password,
        classe: this.etud.classe.id,
        groupe: this.etud.groupe.id,
        filiere:this.etud.classe.filiere.id,
      });
      this.selectedClasseId = this.etud.classe.id;
    }
    console.log(this.editEtudGoup.value)
  }

  handleUpdateEtud() {
    const newEtudiant: Etudiant = this.editEtudGoup.value;
    const selectedClasseId: number = +newEtudiant.classe;
    const selectedGroupeId: number = +newEtudiant.groupe;
    newEtudiant.id = this.etud.id

    console.log(this.editEtudGoup.value);

    const classeId = this.Classes.find((classe) => classe.id === selectedClasseId);

    if (classeId) {
      newEtudiant.classe = classeId; // Create a Classe object with the selected ID

      if (selectedGroupeId !== undefined) {
        const groupeID = this.groupes.find((groupe) => groupe.id === selectedGroupeId);
        if (groupeID) {
          newEtudiant.groupe = groupeID;
        }
      }
        console.log(newEtudiant)

        this.etudService.saveEtudiant2(newEtudiant).subscribe((data) => {
          Swal.fire('Succès', 'Etudiant modifié avec succès', 'success');
          this.router.navigateByUrl('/etudiant');
        });
      }
    }
}
