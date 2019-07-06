import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/Hospital';
import { DutyType } from 'src/app/models/DutyType';
import { UserService } from 'src/app/services/user.service';
import { DutyService } from 'src/app/services/duty.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-hospitals-duties',
  templateUrl: './hospitals-duties.component.html',
  styleUrls: ['./hospitals-duties.component.css']
})
export class HospitalsDutiesComponent implements OnInit {

  router:Router;
  LoggedUser:User;
  selectedDuty:DutyType;
  selectedDutyID:number;

  selectedHospital:Hospital;
  selectedHospitalID:number;

  current_duty_page_number:number;
  nextDutyflag:boolean;
  previousDutyflag:boolean;

  hospitals:Array<Hospital>;
  duties:Array<DutyType>;

  addEditDutyFlag:boolean;
  addOrEditDutyFlag:boolean;

  addEditHospitalFlag:boolean;
  addOrEditHospitalFlag:boolean;


  hospitalSpinner:boolean;
  dutiesSpinner:boolean;
  constructor(router_:Router,private userService:UserService,private dutysService:DutyService,private loginService:LoginService) {
    this.router=router_;
    this.LoggedUser=loginService.getLoggedUser();
    if(this.LoggedUser.MyType.Type_Name!="ادمن"){
      this.router.navigate(["/home"]);
    }
    this.hospitalSpinner=true;
    this.dutiesSpinner=true;
    this.selectedDuty=new DutyType();
    this.selectedHospital=new Hospital();
    this.addEditDutyFlag=false;
    this.addEditHospitalFlag=false;
    this.nextDutyflag=true;
    this.previousDutyflag=false;
    this.current_duty_page_number=-1;
    this.getHospitals();
    this.nextDutyPage();
   }

  ngOnInit() {
  }
  getHospitals(){
    this.hospitalSpinner=true;
    this.userService.getHospitals().subscribe(
      data=>{
          this.hospitals=data;
          this.hospitalSpinner=false;
      }
    )
  }
  getDuties(){
    this.dutysService.getAllDuties(this.current_duty_page_number).subscribe(
      data=>{
        if(data.length>0){
          this.duties=data;
          this.dutiesSpinner=false;
        }
        else{
          this.nextDutyflag=false;
          this.current_duty_page_number=1;
        }
      }
      )
    }
    nextDutyPage(){
      this.current_duty_page_number++;
      this.previousDutyflag=true;
      this.getDuties();
    }
    previousDutyPage(){
      if(this.current_duty_page_number!=0){
        this.current_duty_page_number--;
        this.nextDutyflag=true;
        this.getDuties();
      }
      else{
        this.previousDutyflag=false;
      }
    }
    editDuty(ele){
      this.addEditHospitalFlag=false;
      this.selectedDutyID=ele.currentTarget.id;
      for(let i=0;i<this.duties.length;i++){
        if(this.duties[i].ID==this.selectedDutyID){
          this.selectedDuty=this.duties[i];
          break;
        }
      }
      this.addEditDutyFlag=true;
      this.addOrEditDutyFlag=false;
    }
    addNewDuty(){
      this.addEditHospitalFlag=false;
      this.selectedDuty=new DutyType();
      this.addEditDutyFlag=true;
      this.addOrEditDutyFlag=true;
    }
    deleteDuty(ele){
      this.selectedDutyID=ele.currentTarget.id;
      let con=confirm("تأكيد عملية المسح؟");
      if(con){
        for(let i=0;i<this.duties.length;i++){
          if(this.duties[i].ID==this.selectedDutyID){
            this.selectedDuty=this.duties[i];
            break;
          }
        }
      this.dutysService.deleteDuty(this.selectedDuty).subscribe(
        data=>{
          this.getDuties();
        },
        error=>{
          alert("لا يمكن مسح الخدمة")
        }
      )
    }
    }
    editHospital(ele){
      this.addEditDutyFlag=false;
      this.selectedHospitalID=ele.currentTarget.id;
      for(let i=0;i<this.hospitals.length;i++){
        if(this.hospitals[i].ID==this.selectedHospitalID){
          this.selectedHospital=this.hospitals[i];
          break;
        }
      }
      this.addEditHospitalFlag=true;
      this.addOrEditHospitalFlag=false;
    }
    addNewHospital(){
      this.addEditDutyFlag=false;
      this.selectedHospital=new Hospital();
      this.addEditHospitalFlag=true;
      this.addOrEditHospitalFlag=true;
    }
    deleteHospital(ele){
      this.selectedHospitalID=ele.currentTarget.id;
      let con=confirm("تأكيد عملية المسح؟");
      if(con){
        for(let i=0;i<this.hospitals.length;i++){
          if(this.hospitals[i].ID==this.selectedHospitalID){
            this.selectedHospital=this.hospitals[i];
            break;
          }
        }
      this.dutysService.deleteHospital(this.selectedHospital).subscribe(
        data=>{
          this.getHospitals();
        },
        error=>{
          alert("لا يمكن مسح المستشفي")
        }
      )
    }
  }
    closeAddDutyComponent(){
      this.addEditDutyFlag=false;
      this.getDuties();
    }
    closeAddHospitalComponent(){
      this.addEditHospitalFlag=false;
      this.getHospitals();
    }
  }


