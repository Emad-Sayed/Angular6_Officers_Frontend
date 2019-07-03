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
  @Input() year
  day:number;
  @Output() updateShiftParent =new EventEmitter();
  @Output() closeComponent =new EventEmitter();
  user:User;
  selectedDutyID:number=0;
  date:Date;
  Dutys:Array<DutyType>;
  newShift:Shift;
  alertFlag: boolean=false;
  alertMessage: string;
  selectedDutyName:string;
  submitFlag: boolean=false;
  searchNameFlag=false;
  searchButtonFlag=true;

  constructor(private dutyService:DutyService,private taskService:TaskService,private userService:UserService) {
    this.user=new User();
    this.newShift=new Shift();
   }

  ngOnInit() {
  }

  getDuties(){
    this.dutyService.getDuties(this.user.ID).subscribe(
      data=>{
        this.Dutys=data;
      },
      error=>{}
    )
  }
  setUserByCode(){
    this.userService.getUser(this.user.ID).subscribe(
      data=>{
        this.user=data;
        this.getDuties();
        this.searchButtonFlag=false;
        this.submitFlag=true;
      },
      error=>{
        alert("كود خطأ")
      }
    )
  }
  setUser(selectedUser:User){
    this.user=selectedUser;
    this.getDuties();
    this.searchNameFlag=false;
    this.submitFlag=true;
    this.searchButtonFlag=false;
  }
  getSelectedOption(ele){
    this.selectedDutyID=ele.target.value;
  }
  getOfficerCode(){
    this.searchNameFlag=true;
  }
  addShift(){
    this.submitFlag=false;
    if(this.day!=undefined&&this.selectedDutyID!=0&&this.day<=31){
      this.newShift.Date=new Date(""+this.month+"/"+this.day+"/"+this.year);
      this.newShift.Day=this.day;
      this.newShift.Month=this.month;
      this.newShift.Year=this.year;
      this.newShift.User_=this.user;
      this.newShift.DutyNum=1;
      this.newShift.DutyType_.ID=this.selectedDutyID;
        this.taskService.addFirstShift(this.newShift).subscribe(
          data=>{
            console.log(data)
            this.call_parent();
          },
          error=>{ 
            this.alertMessage=" الضابط متواجد في هذا الشهر "
            this.alertFlag=true;   
           }
        )
    }
    else{
      this.alertMessage=" من فضلك ادخل يوم صحيح ونوع النبطشية";
      this.alertFlag=true;
    }
    this.submitFlag=true;
  }
  call_parent(){
    this.updateShiftParent.next();
  }
  closeThisComponent(){
    this.alertFlag=false;
    this.closeComponent.next();
  }
}
