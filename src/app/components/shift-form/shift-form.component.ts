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
  @Output() closeComponent =new EventEmitter();
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
    if(this.date!=null){
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
          this.alertMessage=" لا يمكن اجراء هذه العملية  ";
           this.alertFlag=true;
          }
      )
    }
    else{
      this.alertMessage="الشهر غير متطابق";
      this.alertFlag=true;

    }
  }
  else{
    this.alertMessage="من فضلك ادخل التاريخ !";
    this.alertFlag=true;
  }

  }
  call_parent(){
    this.updateShiftParent.next();
  }
  closeThisComponent(){
    this.alertFlag=false;
    this.closeComponent.next();
  }

}
