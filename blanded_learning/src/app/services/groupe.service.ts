import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {PageClasse, PageGroup} from '../models/profPage.models';
import { Classe } from '../models/classes.models';
import {Groupe} from "../models/groupe.model";
import {Etudiant} from "../models/etudiant.model";
import {Module} from "../models/modules.models";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(private http:HttpClient) { }
  public getGroupes(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${environment.backendHost}/groupes`);
  }


  public saveGroupe(groupe: Groupe): Observable<Groupe> {
    // Include filiereId as a query parameter in the request
    return this.http.post<Groupe>(
      `${environment.backendHost}/groupes`,
      groupe
    );
  }

  public getByClasse(id : number):Observable<Groupe[]>{
    return this.http.get<Groupe[]>(environment.backendHost+"/groupes/"+id)
  }

  public getByModule(id : number):Observable<Groupe[]>{
    return this.http.get<Groupe[]>(environment.backendHost+"/groupes/module/"+id)
  }

  public searchGroup(keyword : string, page: number, size: number):Observable<PageGroup>{
    return this.http.get<PageGroup>(environment.backendHost+"/groupes/search?keyword="+keyword+"&page=" + page + "&size=" + size)
  }

  public deleteGroupe(id: number): Observable<any>{
    return this.http.delete(environment.backendHost+"/groupes/"+id);
  }


}
