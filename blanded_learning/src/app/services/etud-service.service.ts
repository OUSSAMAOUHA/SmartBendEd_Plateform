import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant.model';

import {environment} from "../../environments/environment";
import { PageEtudiant } from '../models/profPage.models';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

   constructor(private http:HttpClient) { }

   public getEtudiants(page: number, size: number): Observable<PageEtudiant> {
    return this.http.get<PageEtudiant>(environment.backendHost + "/etudiant?page=" + page + "&size=" + size);
  }

  public getEtudiantss(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(environment.backendHost + "/etudiant/all");
  }
  public searchEtudiants(keyword : string,page: number, size: number):Observable<PageEtudiant>{
    return this.http.get<PageEtudiant>(environment.backendHost+"/etudiant/search?keyword="+keyword+"&page=" + page + "&size=" + size)
  }
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
