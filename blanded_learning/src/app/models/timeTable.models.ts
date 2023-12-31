import {Module} from "./modules.models";

export interface TimeSlotClasse {
    id:          number;
  day:     string;
    startTime:   string;
  endTime:   string;
  module: Module;
  salle:   string;
  color:string;
}
