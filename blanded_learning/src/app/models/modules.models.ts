import { Classe } from "./classes.models";
import { Semestre } from "./semestre.models";
import {Prof} from "./prof.models";
import {Filiere} from "./filieres.models";

export interface Module {
  newModule: Classe;
  id: number;
  volumeHoraireOnsite: number;
  volumeHoraireOnRemote: number;
  nbrTD: number;
  nbrTP: number;
  nbrEvaluation: number;
  libelle: string;
  isSeperated: boolean;
  isMetuale: boolean;
  classe: Classe;
  enseignant:Prof;// Reference to the Classe entity
  filiere:Filiere ;
  semestre:String ;
  edited:boolean;

}
