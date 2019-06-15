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
  shiftFormFrag:boolean;
  spinnerTable:boolean;
  temporaryDate:Date;
  newshift:Shift;
  user:User;
  shifts:Array<Array<Shift>>;
  constructor(private taksService:TaskService,private dutyService:DutyService,private userService:UserService) { 
    this.temporaryDate=new Date()
    this.temporaryDate.setMonth(6);
    this.temporaryDate.setFullYear(2019);
    this.getShifts();
    this.spinnerTable=true;
    this.shiftFormFrag=false;
   }

  ngOnInit() {
  }


  getShifts(){
    this.taksService.getShifts(this.temporaryDate.getMonth(),this.temporaryDate.getUTCFullYear()).subscribe(
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
    this.shiftFormFrag=true;
  }
  tableChanged(){
    this.temporaryDate=new Date(this.temporaryDate); // to parse the new string
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

