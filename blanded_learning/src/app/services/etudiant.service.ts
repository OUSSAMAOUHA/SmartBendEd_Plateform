import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prof } from '../models/prof.models';
import {environment} from "../../environments/environment";
import {Etudiant} from "../models/etudiant.model";
import {PageProf} from "../models/profPage.models";
import {Module} from "../models/modules.models";
import {Classe} from "../models/classes.models";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  constructor(private http:HttpClient) { }

  public saveEtudiant1(etud: {
    classeId: number;
    password: string;
    tel: string;
    cne: string;
    login: string;
    nom: string;
    prenom: string;
    email: string;
    civilite: string
  }, classeId: number):Observable<Etudiant>{
    return this.http.post<Etudiant>(`${environment.backendHost}/etudiant?classeId=${classeId}`, etud);
  }
  public saveEtudiant(etud:Etudiant, classeId: number):Observable<Etudiant>{
    return this.http.post<Etudiant>(`${environment.backendHost}/etudiant?classeId=${classeId}`, etud);
  }

  public saveEtudiant2(etud:Etudiant):Observable<Etudiant>{
    return this.http.post<Etudiant>(`${environment.backendHost}/etudiant/save`, etud);
  }

  public searchEtud(id : any):Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(environment.backendHost+"/etudiant/"+id)
  }

  public getById(id : number):Observable<Etudiant>{
    return this.http.get<Etudiant>(environment.backendHost+"/etudiant/etud/"+id)
  }

  deleteEud(id: number) {
    return this.http.delete(environment.backendHost+"/etudiant/"+id);
  }
}
