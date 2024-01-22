import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProfComponent } from './components/gestion/gestion-prof/gestion-prof.component';
import { AddNewProfComponent } from './components/add/add-new-prof/add-new-prof.component';
import { HomeComponent } from './components/home/home.component';
import { GestionMajorComponent } from './components/gestion/gestion-major/gestion-major.component';
import { AddNewMajorComponent } from './components/add/add-new-major/add-new-major.component';
import { AddNewDepartementComponent } from './components/add/add-new-departement/add-new-departement.component';
import { GestionClasseComponent } from './components/gestion/gestion-grade/gestion-classe.component';
import { AddNewGradeComponent } from './components/add/add-new-grade/add-new-grade.component';
import { GestionRoomComponent } from './components/gestion/gestion-room/gestion-room.component';
import { AddNewRoomComponent } from './components/add/add-new-room/add-new-room.component';
import {TimetableComponent} from "./components/timetable/timetable.component";
import { EditProfComponent } from './components/edit/edit-prof/edit-prof.component';
import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { GestionDepartmentComponent } from './components/gestion/gestion-departement/gestion-departement.component';
import { EditDepartementComponent } from './components/edit/edit-departement/edit-departement.component';
import { EditRoomComponent } from './components/edit/edit-room/edit-room.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import {EditMajorComponent} from "./components/edit/edit-major/edit-major.component";
import {EditGradeComponent} from "./components/edit/edit-grade/edit-grade.component";
import { EditProfileComponent } from './components/edit/edit-profile/edit-profile.component';
import { NonDisponibleComponent } from './components/gestion/non-disponible/non-disponible.component';
import {AddNewModuleComponent} from "./components/add/add-new-course/add-new-course.component";
import {GestionModuleComponent} from "./components/gestion/gestion-course/gestion-course.component";
import {EditModuleComponent} from "./components/edit/edit-course/edit-course.component";
import {GestionStudentComponent} from "./components/gestion/gestion-student/gestion-student.component";
import {AddNewStudentComponent} from "./components/add/add-new-student/add-new-student.component";
import {EditStudentComponent} from "./components/edit/edit-student/edit-student.component";
import {GestionCriteriaComponent} from "./components/gestion/gestion-criteria/gestion-criteria.component";
import {AddCriteriaComponent} from "./components/add/add-criteria/add-criteria.component";
import {GestionGroupsComponent} from "./components/gestion/gestion-groups/gestion-groups.component";
import {EditGroupsComponent} from "./components/edit/edit-groups/edit-groups.component";
import {AddGroupComponent} from "./components/add/add-group/add-group.component";
import {TimetableProfComponent} from "./components/timetable-prof/timetable-prof.component";
import {ManipulationComponent} from "./components/manipulation/manipulation.component";
import {TimetableAdminComponent} from "./components/timetable-admin/timetable-admin.component";
import {AffectModelComponent} from "./components/add/affect-model/affect-model.component";

const routes: Routes = [
  { path :'' , component: HomeComponent},
  { path :'index' , component: IndexPageComponent},
    { path :'home' , component: HomeComponent},
    { path :'profs' , component: GestionProfComponent},
    { path :'profs/add' , component: AddNewProfComponent},
    { path :'filieres' , component: GestionMajorComponent},
    { path :'filieres/add' , component: AddNewMajorComponent},
    { path :'departements' , component: GestionDepartmentComponent},
    { path :'departements/add' , component: AddNewDepartementComponent},
    { path :'classes' , component: GestionClasseComponent},
    { path :'classes/add' , component: AddNewGradeComponent},
    { path :'salles' , component: GestionRoomComponent},
    { path :'salles/add' , component: AddNewRoomComponent},
    { path :'emploitemps' , component: TimetableComponent},
  { path :'emploitemps/prof' , component: TimetableProfComponent},
  { path :'manip' , component: ManipulationComponent},
  { path :'timeadm' , component: TimetableAdminComponent},
  { path :'affect' , component: AffectModelComponent},
    {path:'profs/edit',component:EditProfComponent},
  {path:'etud/edit',component:EditStudentComponent},
  {path:'criteria',component:GestionCriteriaComponent},
  {path:'crit/add',component:AddCriteriaComponent},
  {path:'groups',component:GestionGroupsComponent},
  {path:'groups/edit',component:EditGroupsComponent},
  {path:'groups/add',component:AddGroupComponent},
    { path :'departements/edit' , component: EditDepartementComponent},
    { path :'salles/edit' , component: EditRoomComponent},
    { path :'filieres/edit' , component: EditMajorComponent},
    { path :'classes/edit' , component: EditGradeComponent},
    { path :'profile/edit' , component: EditProfileComponent},
    { path :'nonDesponibles' , component: NonDisponibleComponent},
    { path :'coursmodules' , component: GestionModuleComponent},
  { path :'coursmodules/add' , component: AddNewModuleComponent},
  { path :'coursmodules/edit' , component: EditModuleComponent},
  { path :'etudiant' , component: GestionStudentComponent},
  { path :'etudiant/add' , component: AddNewStudentComponent},


  // not-found
    { path :'**' , component: NotFoundComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
