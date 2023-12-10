import {Classe} from "./classes.models";
import {Groupe} from "./groupe.model";

export interface Etudiant {
  id:         number;
  civilite: string;
  nom:        string;
  prenom:     string;
  cne:        string;
  email:      string;
  login:      string;
  password:   string;
  tel: string;
  classe: Classe;
  groupe:Groupe;


}
