import { Component } from '@angular/core';
import {CriteriaService} from "../../../services/Criteria.service";
import { CookieService } from 'ngx-cookie-service';
import {Criteria} from "../../../models/criteria.model";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {EtudiantService} from "../../../services/etudiant.service";
import {Etudiant} from "../../../models/etudiant.model";

@Component({
  selector: 'app-add-criteria',
  templateUrl: './add-criteria.component.html',
  styleUrls: ['./add-criteria.component.css']
})
export class AddCriteriaComponent {

  editCritereGroup!: FormGroup;
  constructor(private etudeService:EtudiantService,private fb: FormBuilder, private criteriaService:CriteriaService, private cookieService: CookieService) {
  }

  criteria:any = null;
  ngOnInit(){
    console.log(this.cookieService.get('userId'))
    this.getCriteria(this.cookieService.get('userId'))
    this.getEtudByID()

  }
  turntoedit(){
    this.editCritereGroup.patchValue({

    })
    this.edit =true;
}
edit = false
  getCriteria(id:string) {
    this.criteriaService.getCriteria(Number(id)).subscribe(data =>{
      console.log("wwwwwwwwwwwwwwwwwwwwwwwwww")
      console.log(data)
      this.criteria = data;
      this.editCritereGroup = this.fb.group({
        preference: this.criteria.preference,
        equipment: this.criteria.equipment,
        learningSpace: this.criteria.learningSpace,
        infrastructure: this.criteria.infrastructure,
      });
    }, error => {
      this.criteria = null;
    })
  }
  etud:any;
  getEtudByID(){
    this.etudeService.getById(Number(this.cookieService.get('userId'))).subscribe(data =>{
      this.etud = data;
      console.log(this.etud)
    }, error => {
      console.log(error)
    })
  }

  saveCriteria(form: NgForm){
    console.log(this.etud);
    console.log(form.value)
    let criteriaa = new Criteria();
      criteriaa.etudiant= this.etud;
      criteriaa.equipment= form.value.equipment;
      criteriaa.learningSpace= form.value.learningSpace;
      criteriaa.infrastructure= form.value.infrastructure;
      criteriaa.preference=form.value.preference;
    console.log(criteriaa);
    this.criteriaService.saveCriteria(criteriaa).subscribe(data =>{
      console.log(data)
      Swal.fire('Success', 'Module Affected avec succès', 'success');
      this.ngOnInit()
    },error => {
      console.error(error);
      if (error.error && error.error.message) {
        Swal.fire('Error', error.error.message, 'error');
      } else {
        Swal.fire('Error', 'erreuur', 'error');
      }
    })

  }

  handeleditCritere() {
    if (this.editCritereGroup.valid && this.criteria) {
      this.criteria.preference = this.editCritereGroup.get('preference')?.value
      this.criteria.infrastructure = this.editCritereGroup.get('infrastructure')?.value
      this.criteria.learningSpace = this.editCritereGroup.get('learningSpace')?.value
      this.criteria.equipment = this.editCritereGroup.get('equipment')?.value
      console.log(this.criteria)
      this.criteriaService.saveCriteria(this.criteria).subscribe((data) => {
        Swal.fire('Succès', 'critere modifié avec succès', 'success');
        this.edit = false
      });
    }
  }


  editCriteree() {

  }
}
