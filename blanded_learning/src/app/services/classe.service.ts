import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageClasse } from '../models/profPage.models';
import { Classe } from '../models/classes.models';
import {Filiere} from "../models/filieres.models";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

   constructor(private http:HttpClient) { }

   public getClasses(page: number, size: number): Observable<PageClasse> {
    return this.http.get<PageClasse>(environment.backendHost + "/classes?page=" + page + "&size=" + size);
  }
  public getClasses1(): Observable<Classe[]> {
    return this.http.get<Classe[]>(environment.backendHost + "/classes");
  }
  public getClassess(): Observable<Classe[]> {
    return this.http.get<Classe[]>(environment.backendHost + "/classes/all");
  }
  public searchClassesSem(keyword : string, sem:number,page: number, size: number):Observable<PageClasse>{
    return this.http.get<PageClasse>(environment.backendHost+"/classes/searchSem?keyword="+keyword+"&page=" + page + "&size=" + size+"&sem="+sem)
  }
  public searchClasses(keyword : string, page: number, size: number):Observable<PageClasse>{
    return this.http.get<PageClasse>(environment.backendHost+"/classes/search?keyword="+keyword+"&page=" + page + "&size=" + size)
  }
  public saveClasse(Classe: Classe, filiereId: number): Observable<Classe> {
    // Include filiereId as a query parameter in the request
    return this.http.post<Classe>(
      `${environment.backendHost}/classes?filiereId=${filiereId}`,
      Classe
    );
  }

  public updateClasse(id: number,Classe: Classe, filiereId: number):Observable<Classe>{
    return this.http.put<Classe>(`${environment.backendHost}/classes/${id}?filiereId=${filiereId}`,Classe);
  }
  public getClasse(id: number):Observable<Classe>{
    return this.http.get<Classe>(environment.backendHost+"/classes/"+id);
  }

  public getClasseByFiliere(id: number):Observable<Classe[]>{
    return this.http.get<Classe[]>(environment.backendHost+"/classes/filiere/"+id);
  }
  public deleteClasse(id: number): Observable<any>{
    return this.http.delete(environment.backendHost+"/classes/"+id);
  }
  public getClassesByFiliere(filiereId: number): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${environment.backendHost}/classes/filere/${filiereId}`);
  }
  public getSemesterByFiliere(filiereId: number): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(`${environment.backendHost}/classes/filere/${filiereId}`);
  }
}

