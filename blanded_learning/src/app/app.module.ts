import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/dashboard/app.component';
import { SidebarComponent } from './components/widgets/sidebar/sidebar.component';
import { NavbarComponent } from './components/widgets/navbar/navbar.component';
import { FooterComponent } from './components/widgets/footer/footer.component';
import { BackgroundComponent } from './components/widgets/background/background.component';

import { PageHeaderComponent } from './components/widgets/page-header/page-header.component';
import { StatistiqueComponent } from './components/widgets/statistique/statistique.component';
import { AddNewProfComponent } from './components/add/add-new-prof/add-new-prof.component';
import { GestionProfComponent } from './components/gestion/gestion-prof/gestion-prof.component';
import { HomeComponent } from './components/home/home.component';
import { GestionMajorComponent } from './components/gestion/gestion-major/gestion-major.component';
import { AddNewMajorComponent } from './components/add/add-new-major/add-new-major.component';
import { AddNewDepartementComponent } from './components/add/add-new-departement/add-new-departement.component';
import { GestionClasseComponent } from './components/gestion/gestion-grade/gestion-classe.component';
import { AddNewGradeComponent } from './components/add/add-new-grade/add-new-grade.component';
import { GestionRoomComponent } from './components/gestion/gestion-room/gestion-room.component';
import { AddNewRoomComponent } from './components/add/add-new-room/add-new-room.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimetableComponent } from './components/timetable/timetable.component';
import { EditProfComponent } from './components/edit/edit-prof/edit-prof.component';
import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionDepartmentComponent } from './components/gestion/gestion-departement/gestion-departement.component';
import { EditDepartementComponent } from './components/edit/edit-departement/edit-departement.component';
import { EditRoomComponent } from './components/edit/edit-room/edit-room.component';
import { ActionsComponent } from './components/dashboard/actions/actions.component';
import { EditMajorComponent } from './components/edit/edit-major/edit-major.component';
import { EditGradeComponent } from './components/edit/edit-grade/edit-grade.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { LoginComponent } from './components/widgets/login/login.component';
import { ProfileComponent } from './components/widgets/profile/profile.component';
import { EditProfileComponent } from './components/edit/edit-profile/edit-profile.component';
import { NonDisponibleComponent } from './components/gestion/non-disponible/non-disponible.component';
import {AddNewModuleComponent} from "./components/add/add-new-course/add-new-course.component";

import {AddNewStudentComponent} from "./components/add/add-new-student/add-new-student.component";
import {GestionStudentComponent} from "./components/gestion/gestion-student/gestion-student.component";
import {GestionModuleComponent} from "./components/gestion/gestion-course/gestion-course.component";
import {EditModuleComponent} from "./components/edit/edit-course/edit-course.component";
import { EditStudentComponent } from './components/edit/edit-student/edit-student.component';
import { GestionCriteriaComponent } from './components/gestion/gestion-criteria/gestion-criteria.component';
import { AddCriteriaComponent } from './components/add/add-criteria/add-criteria.component';
import { GestionGroupsComponent } from './components/gestion/gestion-groups/gestion-groups.component';
import { EditGroupsComponent } from './components/edit/edit-groups/edit-groups.component';
import { AddGroupComponent } from './components/add/add-group/add-group.component';
import {SchedulerModule} from "angular-calendar-scheduler";
import {CalendarModule, DateAdapter, MOMENT} from 'angular-calendar';
import {adapterFactory} from "angular-calendar/date-adapters/moment";
import moment from 'moment';
import {FullCalendarModule} from "@fullcalendar/angular";
import { TimetableProfComponent } from './components/timetable-prof/timetable-prof.component';
import { ManipulationComponent } from './components/manipulation/manipulation.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { TimetableAdminComponent } from './components/timetable-admin/timetable-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PageHeaderComponent,
    StatistiqueComponent,
    ActionsComponent,
    AddNewProfComponent,
    GestionProfComponent,
    HomeComponent,
    GestionMajorComponent,
    AddNewMajorComponent,
    AddNewDepartementComponent,
    GestionClasseComponent,
    AddNewGradeComponent,
    GestionDepartmentComponent,
    GestionRoomComponent,
    AddNewRoomComponent,
    TimetableComponent,
    EditProfComponent,
    NotFoundComponent,
    EditDepartementComponent,
    EditRoomComponent,
    ActionsComponent,
    EditMajorComponent,
    EditGradeComponent,
    IndexPageComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    NonDisponibleComponent,
    AddNewModuleComponent,
    GestionModuleComponent,
    EditModuleComponent,
    AddNewStudentComponent,
    GestionStudentComponent,
    EditStudentComponent,
    GestionCriteriaComponent,
    AddCriteriaComponent,
    BackgroundComponent,
    GestionGroupsComponent,
    EditGroupsComponent,
    AddGroupComponent,
    TimetableProfComponent,
    ManipulationComponent,
    TimetableAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    FullCalendarModule,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: MOMENT, useValue: moment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
