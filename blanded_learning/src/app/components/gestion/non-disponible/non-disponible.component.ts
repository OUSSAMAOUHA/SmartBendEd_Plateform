
import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { NonDesponibilitie } from 'src/app/models/nonDisponibilites.models';
import {Module} from "../../../models/modules.models";
import {CookieService} from "ngx-cookie-service";
import {ModuleService} from "../../../services/module-service.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";


@Component({
  selector: 'app-non-disponible',
  templateUrl: './non-disponible.component.html',
  styleUrls: ['./non-disponible.component.css']
})
export class NonDisponibleComponent {

  modules: Module[] = [];

  @ViewChild('close', { static: true }) close!: ElementRef;

  constructor(private cookieService: CookieService, private moduleService:ModuleService,private renderer: Renderer2) {
  }

  ngOnInit(){
    this.getModules();
  }

  getModules(){
    this.moduleService.getModullesByProd(Number(this.cookieService.get('userId'))).subscribe(data =>{
      this.modules = data;
      console.log(this.modules)
    }, error => {
      console.log(error);
    })
  }

  module = {
    volumeHoraireOnsite: 0,
    volumeHoraireOnRemote: 0
  };
  getSelectedApp(module: any) {
    this.module = module;
  }

  update(module: any) {
    let modulee:Module;
    modulee = module;
    modulee.edited = true;
    console.log(module)
    this.moduleService.createModule(modulee,modulee.classe.id,module.filiere.id).subscribe(data =>{
      console.log(data)

      Swal.fire('Success', 'Module Affected avec succès', 'success');
      const buttonElement = this.close.nativeElement as HTMLButtonElement;
      buttonElement.click();
    },err => {
        console.error(err);
        if (err.error && err.error.message) {
          Swal.fire('Error', err.error.message, 'error');
        } else {
          Swal.fire('Error', 'erreuur', 'error');
        }
      const buttonElement = this.close.nativeElement as HTMLButtonElement;
      buttonElement.click();
      })
  }


  changeVolumes(action: 'increase' | 'decrease') {
    if (action === 'increase') {
      if (this.module.volumeHoraireOnRemote > 0) {
        this.module.volumeHoraireOnRemote--;
        this.module.volumeHoraireOnsite++;
      }
    } else if (action === 'decrease') {
      if (this.module.volumeHoraireOnsite > 0) {
        this.module.volumeHoraireOnRemote++;
        this.module.volumeHoraireOnsite--;
      }
    }
  }

}
