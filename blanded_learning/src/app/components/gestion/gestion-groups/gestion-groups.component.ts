import { Component } from '@angular/core';
import {Groupe} from "../../../models/groupe.model";
import {GroupeService} from "../../../services/groupe.service";
import {ClasseService} from "../../../services/classe.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Classe} from "../../../models/classes.models";
import Swal from "sweetalert2";

@Component({
  selector: 'app-gestion-groups',
  templateUrl: './gestion-groups.component.html',
  styleUrls: ['./gestion-groups.component.css']
})
export class GestionGroupsComponent {

  groups:Groupe[] = [];
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalelements:number=0;
  displayedPages: number[] = [];

  constructor(private groupService:GroupeService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.handleSearchGroup();
  }
  handleEditeGroupe(classeEdit: Groupe) {
    this.router.navigateByUrl('/groups/edit',{state :classeEdit});
  }

  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.handleSearchGroup();
  }
  handleSearchGroup(): void {
    this.groupService
      .searchGroup(this.searchFormGroup.value.keyword, this.page, this.size)
      .subscribe(
        (data) => {
          this.groups = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = data.number;
          this.setDisplayedPages();
        },
        (error) => {
          this.errorMessage = error;
          console.log(error);
        }
      );
  }

  setDisplayedPages(): void {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (
      let i = startPage;
      i < startPage + 3 && i < this.totalPages;
      i++
    ) {
      this.displayedPages.push(i);
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.page = page;
    this.handleSearchGroup();
  }

  goToPreviousSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage;
      this.handleSearchGroup();
    }
  }

  goToNextSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage;
      this.handleSearchGroup();
    }
  }

  handleDeleteGroupe(groupe: Groupe): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not retrieve this data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupService.deleteGroupe(groupe.id).subscribe();
        this.groups= this.groups.filter((c) => c.id !== groupe.id);

      }
    });
  }




}
