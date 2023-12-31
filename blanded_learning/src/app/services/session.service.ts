import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageSalle} from "../models/profPage.models";
import {environment} from "../../environments/environment";
import {Session} from "../models/session.model";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) {
  }

  public getSession(id: number): Observable<Session[]> {
    return this.http.get<Session[]>(environment.backendHost + "/session/" +id);
  }
  public getallSessions() {
    return this.http.get(environment.backendHost + "/runAlgorithm");
  }
}
