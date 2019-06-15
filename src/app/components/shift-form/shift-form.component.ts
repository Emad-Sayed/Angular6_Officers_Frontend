import { Component, OnInit, Input } from '@angular/core';
import { DutyService } from 'src/app/services/duty.service';
import { DutyType } from 'src/app/models/DutyType';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.css']
})
export class ShiftFormComponent implements OnInit {
  @Input() user_ID;
  @Input() cell_Number;
  @Input() user:User
  Dutys:Array<DutyType>
  constructor(private dutyService:DutyService) {
   }

  ngOnInit() {
    this.getDuties();
  }
  addShift(){

  }


  getDuties(){
    this.dutyService.getDuties().subscribe(
      data=>{
        this.Dutys=data;
      },
      error=>{}
    )
  }
}
