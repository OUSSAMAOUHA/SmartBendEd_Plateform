import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import {Prof} from "../../../models/prof.models";

interface ProfDATA {
  civilite: string;
  nom: string;
  prenom: string;
  tel: string;
  cne: string;
  email: string;
  login: string;
  password: string;
  specialite: string;
}
@Component({
  selector: 'app-add-new-prof',
  templateUrl: './add-new-prof.component.html',
  styleUrls: ['./add-new-prof.component.css']
})
export class AddNewProfComponent {
  newProfFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,private profService : ProfServiceService, private router:Router) {}

  ngOnInit(): void {
    this.newProfFormGroup = this.fb.group({

      nom: this.fb.control(null, [Validators.required]),
       cne: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      tel: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
       civilite: this.fb.control(null, [Validators.required]),
      login: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      specialite: this.fb.control(null, [Validators.required])
    });
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const fileContent = e.target.result as ArrayBuffer;
          this.parseXLSXDataForProf(fileContent);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }
  downloadXSL() {
    const xslFilePath = 'assets/DataCSV/Professeurs.xlsx';
    fetch(xslFilePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Profs.xlsx'; // Update with the desired filename
        a.click();
        window.URL.revokeObjectURL(url);
        // Show a SweetAlert2 success message after the download is complete
        Swal.fire({
          icon: 'success',
          title: 'Download Complete',
          text: 'Your XSL file has been downloaded successfully!',
        });
      });
  }

  handleAddProf() {
  if (this.newProfFormGroup.valid) {
    const newProf: Prof = this.newProfFormGroup.value;
    this.profService.saveProf(newProf).subscribe({
      next: data => {
        Swal.fire('Succès', 'Professeur ajouté avec succès', 'success');
        this.router.navigateByUrl('/profs');
      },
      error: err => {
        console.log(err);
      }
    });
  } else {
    Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
  }
}
  parseXLSXDataForProf(fileContent: ArrayBuffer) {
    const workbook = XLSX.read(fileContent, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    this.handleAddProfFromXLSX(data);
  }
  handleAddProfFromXLSX(data: any[]) {
    if (data && data.length > 0) {
      data.forEach((entry: Prof) => {
        this.addProfFromXLSX(entry);
      });
    } else {
      Swal.fire('Error', 'Aucune donnée de professeur valide à ajouter', 'error');
    }
  }
  addProfFromXLSX(prof: ProfDATA) {
    const newProf: {
      civilite: string;
      nom: string;
      prenom: string;
      tel: string;
      cne: string;
      email: string;
      login: string;
      password: string;
      specialite: string;
    } = {
      civilite: prof.civilite,
      nom: prof.nom,
      prenom: prof.prenom,
      tel: prof.tel,
      cne: prof.cne,
      email: prof.email,
      login: prof.login,
      password: prof.password,
      specialite: prof.specialite,
    };

    this.profService.saveProf1(newProf).subscribe({
      next: (data) => {
        console.log('Professeur ajouté avec succès:', newProf);
        Swal.fire('Success', 'Professeur ajouté avec succès', 'success');
      },
      error: (err) => {
        // Check the error response to determine if it's a successful addition or a real error
        if (err.status === 201) {
          console.log('Professeur ajouté avec succès:', newProf);
          // Display a success message here if needed
        } else {
          // Utilize Swal.fire to display an error message
          Swal.fire('Erreur', 'Erreur lors de l\'ajout du professeur', 'error');
          console.error('Erreur lors de l\'ajout du professeur:', err);
        }
      }
    });
  }


}
