import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageClasse } from '../models/profPage.models';
import { Classe } from '../models/classes.models';
import {Criteria} from "../models/criteria.model";

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {

  constructor(private http:HttpClient) { }

  public getCriteria(id:number): Observable<Criteria> {
    return this.http.get<Criteria>(environment.backendHost + "/criteria/"+id);
  }

  public saveCriteria(criteria: Criteria): Observable<Criteria> {
    // Include filiereId as a query parameter in the request
    return this.http.post<Criteria>(
      `${environment.backendHost}/criteria/save`,
      criteria
    );
  }

}
