import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filiere } from '../models/filieres.models';
import { PageFiliere } from '../models/profPage.models';
import {ConsoleLogger} from "@angular/compiler-cli";
import {TimeSlotClasse} from "../models/timeTable.models";

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {

   constructor(private http:HttpClient) { }
  public getAllTimeByClasse(id : number): Observable<TimeSlotClasse[]> {
    return this.http.get<TimeSlotClasse[]>(`${environment.backendHost}/generate/`+id);
  }
  public getAllTimeByProf(id : number): Observable<TimeSlotClasse[]> {
    return this.http.get<TimeSlotClasse[]>(`${environment.backendHost}/generate/prof/`+id);
  }
  public generate(selectedOption:string){
    return this.http.get(`${environment.backendHost}/generate/generate/`+selectedOption);
  }
}
