import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Groupe} from "../models/groupe.model";
import {Observable} from "rxjs";
import {Classe} from "../models/classes.models";
import {environment} from "../../environments/environment";
import {AffectationModuleGroupeTeacher} from "../models/affect.model";

@Injectable({
  providedIn: 'root'
})
export class AffectService {

  constructor(private http:HttpClient) { }

  public saveAffect(affect: AffectationModuleGroupeTeacher): Observable<AffectationModuleGroupeTeacher> {
    // Include filiereId as a query parameter in the request
    return this.http.post<AffectationModuleGroupeTeacher>(
      `${environment.backendHost}/affects`,
      affect
    );
  }

  public getByClasse(id : number):Observable<Groupe[]>{
    return this.http.get<Groupe[]>(environment.backendHost+"/groupes/"+id)
  }

  public getByModule(id : number):Observable<Groupe[]>{
    return this.http.get<Groupe[]>(environment.backendHost+"/groupes/module/"+id)
  }


}
