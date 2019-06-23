import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChange } from '@angular/core';
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
  user_ID:number;
  @Input('user_ID') //to detect changes for single attribute i made set function for input
  set _value(val: number) {
    this.user_ID = val;
    this.getDuties();
    this.selectedDutyID=0;
  }
  @Input() cell_Number;
  @Input() user:User;
  @Input() month;


  @Output() updateShiftParent =new EventEmitter();
  @Output() closeComponent =new EventEmitter();


  selectedDutyID:number=0
  selectedDutyName:string;
  date:Date;
  Dutys:Array<DutyType>;
  newShift:Shift;
  alertFlag:boolean=false;
  alertMessage: string;
  constructor(private dutyService:DutyService,private taskService:TaskService, cd:ChangeDetectorRef) {
    this.newShift=new Shift();
   }

  ngOnInit() {
    this.getDuties();
  }
  getDuties(){
    this.dutyService.getDuties(this.user_ID).subscribe(
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
    if(this.date!=null&&this.selectedDutyID!=0){
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
    this.alertMessage=" من فضلك ادخل التاريخ ونوع النبطشية";
    this.alertFlag=true;
  }
  this.selectedDutyID=0;
  }
  call_parent(){
    this.updateShiftParent.next();
  }
  closeThisComponent(){
    this.alertFlag=false;
    this.closeComponent.next();
  }
  //this function call for all @Input Changes
  /*ngOnChanges(changes: SimpleChange) {

    console.log('ngOnChanges');
    this.getDuties()
  }

  }*/
}
