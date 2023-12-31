import {Module} from "./modules.models";
import {Etudiant} from "./etudiant.model";
import {Prof} from "./prof.models";

export interface Session {
  id:          number;
  etudiant:   Etudiant;
  enseignant:   Prof;
  module: Module;
  mode:   string;
}
