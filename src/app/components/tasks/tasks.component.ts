import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Shift } from 'src/app/models/Shift';
import { User } from 'src/app/models/User';
import { DutyService } from 'src/app/services/duty.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  updateFieldID:number;
  updateFieldnum:number;
  dutyTypeTemp:string;
  shiftFormFrag:boolean;
  shiftDetails:boolean;
  spinnerTable:boolean;
  month:number;
  year:number;
  newshift:Shift;
  user:User;
  shifts:Array<Array<Shift>>;
  constructor(private taksService:TaskService,private dutyService:DutyService,private userService:UserService) { 
    this.month=6;
    this.year=2019;
    this.spinnerTable=true;
    this.getShifts();
    this.shiftFormFrag=false;
    this.shiftDetails=false;
   }

  ngOnInit() {
  }


  getShifts(){
    this.taksService.getShifts(this.month,this.year).subscribe(
      data=>{
        this.shifts=data;
        this.spinnerTable=false;
      },
      error=>{console.log(error)}
    )
  }
  showShiftForm(ele){
    this.updateFieldID=ele.currentTarget.id;
    this.updateFieldnum=ele.currentTarget.name;
    this.getUserData();
    if(ele.currentTarget.classList=='btn btn-success btn-danger'){
      this.shiftFormFrag=true;
      this.shiftDetails=false;
    }
    else{
      this.shiftFormFrag=false;
      this.shiftDetails=true;
      for(let i=0;i<this.shifts.length;i++){
        if(this.shifts[i][0].User_.ID==this.updateFieldID){
          for(let j=0;j<16;j++){
            if(this.shifts[i][j].DutyNum==this.updateFieldnum){
              this.dutyTypeTemp=this.shifts[i][j].DutyType_.DutyType_Name
              break;
            }
          }
        }
        break;
      }
    }

  }
  updateShiftList(){
    this.shifts=null;
    this.spinnerTable=true;
    this.getShifts();
  }
  tableChanged(){
    this.shifts=null;
    this.spinnerTable=true;
    this.getShifts();
  }
  getUserData(){
    this.userService.getUser(this.updateFieldID).subscribe(
      data=>{
        this.user=data;
      },
      error=>{}
    )
  }
}

