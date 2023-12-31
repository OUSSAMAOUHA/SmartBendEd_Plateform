import { Classe } from "./classes.models";
import { Departement } from "./departement.models";
import { Filiere } from "./filieres.models";
import { Prof } from "./prof.models";
import { Salle } from "./salles.models";
import {Etudiant} from "./etudiant.model";
import {Groupe} from "./groupe.model";
import {Module} from "./modules.models";

export interface PageProf {
    content:          Prof[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;

}
export interface PageEtudiant {
    content:          Etudiant[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;

}
export interface PageDepartment {
    content:          Departement[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;

}
export interface PageSalle {
    content:          Salle[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;
    }
export interface PageFiliere {
    content:          Filiere[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;
    }
export interface PageClasse {
    content:          Classe[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;
    }

export interface PageGroup {
  content:          Groupe[];
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  numberOfElements: number;
}

export interface PageModule {
  content:          Module[];
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  numberOfElements: number;
}
