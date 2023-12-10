import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Salle } from 'src/app/models/salles.models';
import { SalleService } from 'src/app/services/salle.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';



interface SalleCSV {
  bloc: string;
  numSalle: number;
  typeSalle: string;
  capacite: number;
}
@Component({
  selector: 'app-add-new-salle',
  templateUrl: './add-new-room.component.html',
  styleUrls: ['./add-new-room.component.css']
})
export class AddNewRoomComponent {
  newSalleFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,private dpService:SalleService,
    private router: Router) {}

  ngOnInit(): void {
    this.newSalleFormGroup = this.fb.group({
      bloc: this.fb.control(null, [Validators.required]),
      capacite: this.fb.control(null, [Validators.required]),
      typeSalle: this.fb.control(null, [Validators.required]),
      numSalle: this.fb.control(null, [Validators.required])
    });
  }

  handleAddDepartement() {
    if (this.newSalleFormGroup.valid) {
    const newSalle: Salle = this.newSalleFormGroup.value;
    this.dpService.saveSalle(newSalle).subscribe({
      next: data => {
        Swal.fire('Succès', 'Salle ajouté avec succès', 'success');
        this.router.navigateByUrl('/salles');
      },
      error: err => {
        console.log(err);
      }
    });
  } else {
    Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
  }
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const fileContent = e.target.result as ArrayBuffer;
          this.parseXLSXData(fileContent);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }

  parseXLSXData(fileContent: ArrayBuffer) {
    const workbook = XLSX.read(fileContent, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    // Call a new function to handle Salle data
    this.handleAddSalleFromXLSX(data);
  }

  handleAddSalleFromXLSX(data: any[]) {
    if (data && data.length > 0) {
      data.forEach((entry: Salle) => {
        this.addSalleFromXLSX(entry);
      });
    } else {
      Swal.fire('Error', 'No valid Salle data to add', 'error');
    }
  }

  downloadXSL() {
    const xslFilePath = 'assets/DataCSV/Salles.xlsx';
    fetch(xslFilePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Salles.xlsx'; // Update with the desired filename
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

  addSalleFromXLSX(salle: SalleCSV) {
    // Check if required properties for salle are present
    if (salle.bloc && salle.numSalle && salle.typeSalle && salle.capacite) {
      const newSalle = {
        bloc: salle.bloc,
        numSalle: salle.numSalle,
        typeSalle: salle.typeSalle,
        capacite: salle.capacite,
      };

      // Assuming you have a service for saving Salle data, replace `this.salleService.saveSalle` with your actual service call
      this.dpService.saveSalle1(newSalle).subscribe({
        next: (data) => {
          console.log('Salle ajoutée avec succès:', newSalle);
          Swal.fire('Success', 'Salle ajoutée avec succès', 'success');
        },
        error: (err) => {
          // Check the error response to determine if it's a successful addition or a real error
          if (err.status === 201) {
            console.log('Salle ajoutée avec succès:', newSalle);
            // Display a success message here if needed
          } else {
            // Utilize Swal.fire to display an error message
            Swal.fire('Erreur', 'Erreur lors de l\'ajout de la salle', 'error');
            console.error('Erreur lors de l\'ajout de la salle:', err);
          }
        },
      });
    } else {
      // Use Swal.fire to display an error message
      Swal.fire('Erreur', 'Données de Salle invalides', 'error');
      console.error('Salle data is incomplete or invalid.');
    }
  }




}
