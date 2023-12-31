import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";
import {TimeTableService} from "../../services/timeTable.service";
import Swal from "sweetalert2";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-manipulation',
  templateUrl: './manipulation.component.html',
  styleUrls: ['./manipulation.component.css']
})
export class ManipulationComponent {
  typeSelected: string;
  selectedOption: string = '1';

  constructor(private sessionService:SessionService,
              private timeSlotService:TimeTableService,
              private spinner: NgxSpinnerService) {
    this.typeSelected = 'ball-fussion';
  }
  chooseSessionMode(){
    this.spinner.show();
    this.sessionService.getallSessions().subscribe(data =>{
      this.spinner.hide();
      Swal.fire('Success', 'Sessions generated successfuly', 'success');
    },error => {
      this.spinner.hide();
      Swal.fire('Warning', 'Modes generated, but some students did not entred their data yet !', 'warning');
    })
  }
  generatePlanning(){
    console.log(this.selectedOption)
    this.spinner.show();
    this.timeSlotService.generate(this.selectedOption).subscribe(data =>{
      this.spinner.hide();
      Swal.fire('Success', 'Planning generated successfuly', 'success');
    },error => {
      this.spinner.hide();
      Swal.fire('error', 'Some students did not entred their data yet !', 'error');
    })
  }

  public showSpinner(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000); // 5 seconds
  }

}
