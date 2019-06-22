import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DutyType } from 'src/app/models/DutyType';
import { User } from 'src/app/models/User';
import { Shift } from 'src/app/models/Shift';
import { DutyService } from 'src/app/services/duty.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-first-shift',
  templateUrl: './first-shift.component.html',
  styleUrls: ['./first-shift.component.css']
})
export class FirstShiftComponent implements OnInit {

  @Input() month
  @Output() updateShiftParent =new EventEmitter();
  @Output() closeComponent =new EventEmitter();
  user:User;
  selectedDutyID:number=1;
  date:Date;
  Dutys:Array<DutyType>;
  newShift:Shift;
  alertFlag: boolean=false;
  alertMessage: string;
  submitFlag: boolean=false;
  
  constructor(private dutyService:DutyService,private taskService:TaskService,private userService:UserService) {
    this.user=new User();
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
  getUser(ele){
    this.userService.getUser(this.user.ID).subscribe(
      data=>{
        this.user=data
        this.submitFlag=true;
      },
      error=>{
        this.user.name="كود غير صحيح"
        this.submitFlag=false;
      }
    )
  }
  getSelectedOption(ele){
    this.selectedDutyID=ele.target.value;
  }
  addShift(){
    if(this.date!=null){
    this.newShift.User_=this.user;
    this.newShift.DutyNum=1;
    this.newShift.Date=new Date(this.date);
    this.newShift.DutyType_.ID=this.selectedDutyID;
    if(this.newShift.Date.getMonth()+1==this.month){
      this.taskService.addFirstShift(this.newShift).subscribe(
        data=>{
          this.call_parent();
        },
        error=>{ 
          this.alertMessage=" المريض متواجد في هذا الشهر "
          this.alertFlag=true;   
         }
      )
    }
    else{
      this.alertMessage="الشهر غير متطابق"
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
