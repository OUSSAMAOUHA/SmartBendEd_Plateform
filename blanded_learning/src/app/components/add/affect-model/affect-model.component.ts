import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Module} from "../../../models/modules.models";
import Swal from "sweetalert2";
import {ModuleService} from "../../../services/module-service.service";
import {Router} from "@angular/router";
import {ProfServiceService} from "../../../services/prof-service.service";
import {ClasseService} from "../../../services/classe.service";
import {GroupeService} from "../../../services/groupe.service";
import {FiliereService} from "../../../services/filiere.service";
import {AffectService} from "../../../services/affect.service";
import {Prof} from "../../../models/prof.models";
import {Classe} from "../../../models/classes.models";
import {Filiere} from "../../../models/filieres.models";
import {Groupe} from "../../../models/groupe.model";

@Component({
  selector: 'app-affect-model',
  templateUrl: './affect-model.component.html',
  styleUrls: ['./affect-model.component.css']
})
export class AffectModelComponent implements OnInit {

    newProfFormGroup!: FormGroup;
  ngOnInit(): void {
      this.newProfFormGroup = this.fb.group({

          classe: this.fb.control(null, [Validators.required]),
          groupe: this.fb.control(null),
          module: this.fb.control(null, [Validators.required]),
          prof: this.fb.control(null, [Validators.required]),
          civilite: this.fb.control(null, [Validators.required])
      });

    this.getAllProf();
    this.fetchFilieres();

  }

  constructor(
    private moduleService: ModuleService,
    private fb: FormBuilder,
    private router: Router,
    private profService:ProfServiceService,
    private classeService:ClasseService,
    private groupeService:GroupeService,

    private filiereService:FiliereService,private renderer: Renderer2, private groupeservice:GroupeService,private affectservice:AffectService,
  ) {}

  profs:Prof[]=[];

  getAllProf(){
    this.profService.getProfss().subscribe(data =>{
      this.profs = data;
      console.log(this.profs);
    })
  }
  Classes:Classe[]=[];
  fetchClass(id:any) {
    this.classeService.getClasseByFiliere(id).subscribe(
      (response: any) => {
        console.log(response)
        const classes: Classe[] = response;
        console.log(classes)
        this.Classes = classes;
        console.log(this.Classes);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filieres:Filiere[]=[];
  fetchFilieres() {


    this.filiereService.getAllFilieres().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Filiere[] = response.content;
          this.filieres = filieres;
          console.log(this.filieres);
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  modulles :Module[] = [];

  loadModulles(event:any) {
    const id = event.target.value
    console.log(id)
    console.log("-----------------------------")
    this.moduleService.getModullesByClasse(id).subscribe(
      (data: Module[]) => {
        this.modulles = data; //
        console.log(this.modulles)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  groupes:Groupe[]=[];

  getGroupesByClasse(event:any) {
    const id = event.target.value;
    this.groupeService.getByClasse(id).subscribe(data =>{
      this.groupes = data;
      console.log(this.groupes)
    },error =>{
      console.log(error)
    })
  }

  affect() {
    console.log(this.newProfFormGroup.value)
          console.log(this.newProfFormGroup.value);
          // You can also access the form object if needed
          let moduleeee: Module = this.newProfFormGroup.value.module;
          console.log(moduleeee)
          moduleeee.enseignant = this.newProfFormGroup.value.prof;
          console.log(moduleeee)
          this.moduleService.saveModule(moduleeee).subscribe(data => {
              console.log(data)
              Swal.fire('Success', 'Module Affected successfuly', 'success');
              this.newProfFormGroup.reset();
              this.router.navigateByUrl('/coursmodules');
          }, error => {
              console.log(error)
              Swal.fire('Error', 'erreuur', 'error');
              this.newProfFormGroup.reset();
          })
      }

}
