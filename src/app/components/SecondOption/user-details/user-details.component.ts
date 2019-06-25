import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Rank } from 'src/app/models/Rank';
import { Degree } from 'src/app/models/Degree';
import { Specialization } from 'src/app/models/Specialization';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user_ID:number;

  @Input('userID')
  set userValue(value:number){
    this.user_ID=value;
    this.getUser();
  }
  @Output() call_parent_close_me=new EventEmitter();

  user:User;

  selectedDegree:string;
  selectedDegreeID:number;

  selectedSpetialization:string;
  selectedSpetializationID:number;

  selectedRank:string;
  selectedRankID:number;


  Ranks:Array<Rank>;
  Degrees:Array<Degree>
  Spetializations:Array<Specialization>

  alertFlag:boolean;
  alertMessage:string;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getRanks();
    this.getDegress();
    this.getSpetializations();
    this.selectedDegreeID=0;
    this.selectedRankID=0;
    this.selectedSpetializationID=0;
    this.alertFlag=false;
  }
  getUser(){
    this.userService.getUser(this.user_ID).subscribe(
      data=>{this.user=data}
    )
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
  getSelectedRank(ele){
    this.selectedRankID=ele.currentTarget.value;
  }
  getSelectedDegree(ele){
    this.selectedDegreeID=ele.currentTarget.value;
  }
  getSelectedSpetialization(ele){
    this.selectedSpetializationID=ele.currentTarget.value;
  }
  updateInfo(){
    if(this.selectedRankID!=0&&this.selectedSpetializationID!=0&&this.selectedDegreeID!=0){
      this.user.MyRank.ID=this.selectedRankID;
      this.user.MyDegree.ID=this.selectedDegreeID;
      this.user.MySpecialization.ID=this.selectedSpetializationID;
      this.userService.updateUser(this.user).subscribe(
        data=>{
          this.call_parent_close_me.next();
        }
      )
    }
    else{
      this.alertFlag=true;
      this.alertMessage="يجب ملأ الحقول بالكامل"
    }

  }

}
