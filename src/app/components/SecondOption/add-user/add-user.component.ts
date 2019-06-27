import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Rank } from 'src/app/models/Rank';
import { Degree } from 'src/app/models/Degree';
import { Specialization } from 'src/app/models/Specialization';
import { User } from 'src/app/models/User';
import { Hospital } from 'src/app/models/Hospital';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user:User;

  alertFlag:boolean;
  alertMessage:string;

  selectedDegree:string;
  selectedDegreeID:number;

  selectedSpetialization:string;
  selectedSpetializationID:number;

  selectedRank:string;
  selectedRankID:number;

  selectedHospital:string;
  selectedHospitalID:number;


  Ranks:Array<Rank>;
  Degrees:Array<Degree>
  Spetializations:Array<Specialization>
  Hospitals:Array<Hospital>

  @Output() call_parent_close_me=new EventEmitter();
  constructor(private userService:UserService) {
    this.user=new User();
    this.getRanks();
    this.getDegress();
    this.getSpetializations();
    this.getHospitals();
    this.selectedDegreeID=0;
    this.selectedRankID=0;
    this.selectedSpetializationID=0;
    this.selectedHospitalID=0;
    this.alertFlag=false;
   }

  ngOnInit() {
  }

  getRanks(){
    this.userService.getRanks().subscribe(
      data=>{this.Ranks=data}
    )
  }
  getDegress(){
    this.userService.getDegree().subscribe(
      data=>{this.Degrees=data}
    )
  }
  getSpetializations(){
    this.userService.getSpetialization().subscribe(
      data=>{this.Spetializations=data}
    )
  }
  getHospitals(){
    this.userService.getHospitals().subscribe(
      data=>{this.Hospitals=data}
    )
  }
  getSelectedRank(ele){
    this.selectedRankID=ele.currentTarget.value;
  }
  getSelectedDegree(ele){
    this.selectedDegreeID=ele.currentTarget.value;
  }
  getSelectedSpetialization(ele){
    this.selectedSpetializationID=ele.currentTarget.value;
  }
  getSelectedHospital(ele){
    this.selectedHospitalID=ele.currentTarget.value;
  }
  addNewUser(){
    if(this.selectedRankID!=0&&this.selectedDegreeID!=0&&this.selectedSpetializationID!=0&&this.selectedHospitalID!=0){
      this.user.MyRank.ID=this.selectedRankID;
      this.user.MyDegree.ID=this.selectedDegreeID;
      this.user.MySpecialization.ID=this.selectedSpetializationID;
      this.user.MyHospital.ID=this.selectedHospitalID;
      this.userService.addUser(this.user).subscribe(
        data=>{ this.closeThisComponent() },
        error=>{}
      )
    }
    else{
      this.alertFlag=true;
      this.alertMessage="يجب ملأ جميع الحقول"
    }
  }
  closeThisComponent(){
    this.call_parent_close_me.next();
  }
}
