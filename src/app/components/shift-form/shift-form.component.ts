import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DutyService } from 'src/app/services/duty.service';
import { DutyType } from 'src/app/models/DutyType';
import { User } from 'src/app/models/User';
import { Shift } from 'src/app/models/Shift';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.css']
})
export class ShiftFormComponent implements OnInit {
  @Input() user_ID;
  @Input() cell_Number;
  @Input() user:User;
  @Output() updateShiftParent =new EventEmitter();
  selectedDutyID:number;
  date:string;
  Dutys:Array<DutyType>;
  newShift:Shift;
  constructor(private dutyService:DutyService,private taskService:TaskService) {
    this.newShift=new Shift();
   }

  ngOnInit() {
    this.getDuties();
  }

  getDuties(){
    this.dutyService.getDuties().subscribe(
      data=>{
        this.Dutys=data;
      },
      error=>{}
    )
  }
  getSelectedOption(ele){
    this.selectedDutyID=ele.target.value;
  }
  addShift(){
    console.log(this.date)
    this.newShift.User_=this.user;
    this.newShift.DutyNum=this.cell_Number;
    this.newShift.Date=this.date;
    this.newShift.DutyType_.ID=this.selectedDutyID;

    this.taskService.addShift(this.newShift).subscribe(
      data=>{
        this.call_parent();
      },
      error=>{console.log(error)}
    )
  }
  call_parent(){
    this.updateShiftParent.next();
  }

}
