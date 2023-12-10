import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClasseService} from "../../../services/classe.service";
import {Etudiant} from "../../../models/etudiant.model";
import {Classe} from "../../../models/classes.models";
import {EtudiantService} from "../../../services/etud-service.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {CriteriaService} from "../../../services/Criteria.service";
import {Prof} from "../../../models/prof.models";

@Component({
  selector: 'app-gestion-etudiant',
  templateUrl: './gestion-student.component.html',
  styleUrls: ['./gestion-student.component.css']
})
export class GestionStudentComponent {
  @ViewChild('exampleModal') modal: any;
  classes: Classe[] = [];
  selectedClasse!: Classe;
  etuds: Etudiant[] = [];

  errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalelements:number=0;
  displayedPages: number[] = [];
  option1:number=0;
  option2:number=0;
  option3:number=0;
  option4:number=0;

  ngOnInit(): void {
    this.getClasses();
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.handleSearchCustomers();

  }
  constructor(private classeService:ClasseService,
              private criteriaService:CriteriaService,
              private fb: FormBuilder,
              private etudiantService:EtudiantService,
              private router: Router) {

  }
  private getClasses() {
    this.classeService.getClassess().subscribe(data => {
      this.classes = data;
      console.log(this.classes)
    });
  }
  closeModal() {
    this.modal.hide(); // You should use the correct method for your specific modal library, e.g., .hide() for Bootstrap modal.
  }

  searchEtud(classe:Classe) {
    if (classe != null) {
      this.etudiantService.searchEtud(classe.id).subscribe(data => {
        this.etuds = data
        console.log(this.etuds)
      })
    }
    else {
      this.etuds = []
    }
  }

  handleEditeEtud(etud: Etudiant) {
    this.router.navigateByUrl('/etud/edit',{state :etud});
  }

  handleDeleteEtud(etud: Etudiant) {
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
        this.etudiantService.deleteEud(etud.id).subscribe();
        this.etuds.splice( this.etuds.indexOf(etud),1);

      }
    });
  }
criteria : any
  handleCritereEtud(etud: Etudiant) {
    this.criteria = null
    this.criteriaService.getCriteria(etud.id).subscribe(data =>{
      console.log("wwwwwwwwwwwwwwwwwwwwwwwwww")
      console.log(data)
      this.criteria = data;
  }, error => {
      this.criteria = null;
    })
}

  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    const kw = this.searchFormGroup?.value.keyword;
    this.etudiantService.searchEtudiants(kw, this.page, this.size).subscribe({
      next: (data) => {
        this.etuds = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
        this.totalelements=data.totalElements;
        this.setDisplayedPages();
        console.log(data);
        this.option1=Math.ceil(this.totalelements/4)
        this.option2= Math.ceil((this.totalelements/2))
        this.option3=Math.ceil((this.totalelements/4)*3)
        this.option4=this.totalelements;
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err);
      }
    });
  }

  setDisplayedPages() {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (let i = startPage; i < startPage + 3 && i < this.totalPages; i++) {
      this.displayedPages.push(i);
    }
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.page = page; // Update the page parameter
    this.handleSearchCustomers();
  }

  goToPreviousSet() {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage; // Update the page parameter
      this.handleSearchCustomers();
    }
  }

  goToNextSet() {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage; // Update the page parameter
      this.handleSearchCustomers();
    }
  }
}
