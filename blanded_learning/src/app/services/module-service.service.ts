import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prof } from '../models/prof.models';
import {environment} from "../../environments/environment";
import { PageProf } from '../models/profPage.models';
import {Module} from "../models/modules.models";

@Injectable({
  providedIn: 'root'
})
export class ModuleService  {

   constructor(private http:HttpClient) { }

  // Retrieve all modules with pagination
  public getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${environment.backendHost}/modules`);
  }

  public getModulles(): Observable<Module[]> {
    return this.http.get<Module[]>(`${environment.backendHost}/modules/modullees`);
  }

  public getModullesByProd(id:number): Observable<Module[]> {
    return this.http.get<Module[]>(`${environment.backendHost}/modules/modullees/`+id);
  }
  public getModullesByClasse(id:number): Observable<Module[]> {
    return this.http.get<Module[]>(`${environment.backendHost}/modules/classe/`+id);
  }

  // Search for modules by keyword
  public searchModules(keyword: string, page: number, size: number): Observable<Module> {
    return this.http.get<Module>(`${environment.backendHost}/modules/search?keyword=${keyword}&page=${page}&size=${size}`);
  }

  // Create a new module
  public createModule(module: Module, classeId: number, filiereId: number): Observable<Module> {
    return this.http.post<Module>(
      `${environment.backendHost}/modules?classeId=${classeId}&filiereId=${filiereId}`,
      module
    );
  }


  // Update an existing module by ID
  updateModule(id: number, module: Module, classeId: number, filiereId: number): Observable<Module> {
    return this.http.put<Module>(`${environment.backendHost}/modules/${id}?classeId=${classeId}&filiereId=${filiereId}`, module);
  }


  // Retrieve a single module by ID
  public getModule(id: number): Observable<Module> {
    return this.http.get<Module>(`${environment.backendHost}/modules/${id}`);
  }

  // Delete a module by ID
  public deleteModule(id: number): Observable<any> {
    return this.http.delete(`${environment.backendHost}/modules/${id}`);
  }

}
