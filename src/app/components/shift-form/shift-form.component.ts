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
  @Input() month;
  @Output() updateShiftParent =new EventEmitter();
  selectedDutyID:number;
  date:Date;
  Dutys:Array<DutyType>;
  newShift:Shift;
  alertFlag:boolean=false;
  alertMessage: string;
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
      error=>{
        this.alertFlag=true;
      }
    )
  }
  getSelectedOption(ele){
    this.selectedDutyID=ele.target.value;
  }
  addShift(){
    console.log(this.date)
    this.newShift.User_=this.user;
    this.newShift.DutyNum=this.cell_Number;
    this.newShift.Date=new Date(this.date);
    this.newShift.DutyType_.ID=this.selectedDutyID;
    if(this.newShift.Date.getMonth()+1==this.month){
      this.taskService.addShift(this.newShift).subscribe(
        data=>{
          this.call_parent();
        },
        error=>{ 
          console.log(error);
           this.alertFlag=true;
           this.alertMessage=" لا يمكن اجراء هذه العملية  ";
          }
      )
    }
    else{
      this.alertFlag=true;
      this.alertMessage="الشهر غير متطابق";
    }

  }
  call_parent(){
    this.updateShiftParent.next();
  }

}
