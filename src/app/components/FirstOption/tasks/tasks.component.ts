import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Shift } from 'src/app/models/Shift';
import { User } from 'src/app/models/User';
import { DutyService } from 'src/app/services/duty.service';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  LoggedUser:User;
  isAdmin:boolean;
  updateFieldID:number;                    // Button user ID
  updateFieldnum:number;                   // Button Shift Number
  updateFieldShiftID:number;              // Button Shift ID
  dutyTypeTemp:string;

  shiftFormFrag:boolean;
  firstShift:boolean;
  shiftDetails:boolean;
  spinnerTable:boolean;
  month:number;
  year:number;
  newshift:Shift;
  user:User;
  shifts:Array<Array<Shift>>;
  alertFlag: boolean=false;
  searchField:string;
  searhFlag:boolean=false;
  formFlag:boolean=true;
  constructor(private taksService:TaskService,private dutyService:DutyService,private userService:UserService,private loginService:LoginService) { 
    this.LoggedUser=this.loginService.getLoggedUser();
    this.isAdmin=false;
    if(this.LoggedUser.MyType.Type_Name=='ادمن'){
      this.isAdmin=true;
    }
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
         this.alertFlag=false;
      },
      error=>{
        this.alertFlag=true;
        this.spinnerTable=false;

      }
    )
  }
  showShiftForm(ele){
    this.removeSearchField();
    this.updateFieldID=ele.currentTarget.id;
    this.updateFieldnum=ele.currentTarget.name;
    this.updateFieldShiftID=ele.currentTarget.value;
    this.getUserData();
    this.firstShift=false;
    if(ele.currentTarget.classList=='btn btn-light'&&this.LoggedUser.MyType.Type_Name=='ادمن'){
      this.shiftFormFrag=true;
      this.shiftDetails=false;

    }
    else if(ele.currentTarget.classList=='btn btn-success'){
      this.shiftFormFrag=false;
      this.shiftDetails=true;
      for(let i=0;i<this.shifts.length;i++){
        if(this.shifts[i][0].User_.ID==this.updateFieldID){
          for(let j=0;j<16;j++){
            if(this.shifts[i][j].DutyNum==this.updateFieldnum){
              this.dutyTypeTemp=this.shifts[i][j].DutyType_.DutyType_Name;
              break;
            }
          }
        }
      }
    }

  }
  updateShiftList(){
    this.shiftFormFrag=false;
    this.shiftDetails=false;
    this.firstShift=false;
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
  plusRecord(){
    this.removeSearchField();
    this.shiftFormFrag=false;
    this.shiftDetails=false;
    this.firstShift=true;
  }
  Search(){
    this.shiftDetails=false;
    this.shiftFormFrag=false;
    this.firstShift=false
    this.formFlag=false;
    this.searhFlag=true;
  }
  Filter(){
    if(this.searchField==""){
      this.spinnerTable=true;
      this.getShifts();
    }

    this.shifts=this.shifts.filter(
      res=>{return res[0].User_.name.match(this.searchField)
         }
    )
  }
  removeSearchField(){
    this.searhFlag=false;
    this.formFlag=true;
  }
  closeFirstShiftComponent(){
    this.firstShift=false;
  }
  closeDetailsShiftComponent(){
    this.shiftDetails=false;
  }
  closeFormShiftComponent(){
    this.shiftFormFrag=false;
  }
}

