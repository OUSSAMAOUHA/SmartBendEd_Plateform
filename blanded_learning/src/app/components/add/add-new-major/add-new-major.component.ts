import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FiliereService } from '../../../services/filiere.service';
import { Filiere } from '../../../models/filieres.models';
import * as XLSX from 'xlsx';

interface FiliereCSV {
  libelle: string;
  nombreSem: number;
  chefFiliere: string;
  departement: string;
}
@Component({
  selector: 'app-add-new-filiere',
  templateUrl: './add-new-major.component.html',
  styleUrls: ['./add-new-major.component.css'],
})
export class AddNewMajorComponent implements OnInit {
  newFiliereFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private filiereService: FiliereService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newFiliereFormGroup = this.fb.group({
      libelle: this.fb.control(null, [Validators.required]),
      nombreSem: this.fb.control(null, [Validators.required]),
      chefFiliere: this.fb.control(null, [Validators.required]),
      departement: this.fb.control(null, [Validators.required])
    });
  }



  handleAddFiliere() {
    if (this.newFiliereFormGroup.valid) {
      const newFiliere: Filiere = this.newFiliereFormGroup.value;
      this.filiereService.saveFiliere(newFiliere).subscribe({
        next: () => {
          Swal.fire('Succès', 'Filière ajoutée avec succès', 'success');
          this.router.navigateByUrl('/filieres');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      Swal.fire(
        'Erreur',
        'Veuillez remplir correctement tous les champs du formulaire',
        'error'
      );
    }
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const fileContent = e.target.result as ArrayBuffer;
          this.parseXLSXFiliereData(fileContent);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }

  parseXLSXFiliereData(fileContent: ArrayBuffer) {
    const workbook = XLSX.read(fileContent, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    this.handleAddFiliereFromXLSX(data);
  }

  handleAddFiliereFromXLSX(data: any[]) {
    if (data && data.length > 0) {
      data.forEach((entry: Filiere) => {
        this.addFiliereFromXLSX(entry);
      });
    } else {
      Swal.fire('Error', 'Aucune donnée de filière valide à ajouter', 'error');
    }
  }
  downloadXSL() {
    const xslFilePath = 'assets/DataCSV/Filieres.xlsx';
    fetch(xslFilePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Filieres.xlsx'; // Update with the desired filename
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
  addFiliereFromXLSX(filiere: FiliereCSV) {
    if (filiere.libelle && filiere.departement) {
      const newFiliere: { chefFiliere: string; nombreSem: number; departement: string; libelle: string } = {
        libelle: filiere.libelle,
        nombreSem: filiere.nombreSem,
        chefFiliere: filiere.chefFiliere,
        departement: filiere.departement
      };

      this.filiereService.saveFiliere1(newFiliere).subscribe({
        next: data => {
          console.log('Filiere ajoutée avec succès:', newFiliere);
          Swal.fire('Success', 'Filiere ajoutée avec succès', 'success');
        },
        error: err => {
          // Check the error response to determine if it's a successful addition or a real error
          if (err.status === 201) {
            console.log('Filiere ajoutée avec succès:', newFiliere);
            // Display a success message here if needed
          } else {
            // Utilize Swal.fire to display an error message
            Swal.fire('Erreur', 'Erreur lors de l\'ajout de la Filiere', 'error');
            console.error('Erreur lors de l\'ajout de la Filiere:', err);
          }
        }
      });
    } else {
      // Utilize Swal.fire to display an error message
      Swal.fire('Erreur', 'Libellé et département sont requis pour ajouter une Filière', 'error');
      console.error('Libellé and département are required in the XLSX data');
    }
  }


}
