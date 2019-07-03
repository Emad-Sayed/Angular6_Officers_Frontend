import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Hospital } from 'src/app/models/Hospital';
import { UserService } from 'src/app/services/user.service';
import { DutyType } from 'src/app/models/DutyType';
import { DutyService } from 'src/app/services/duty.service';

@Component({
  selector: 'app-new-duty',
  templateUrl: './new-duty.component.html',
  styleUrls: ['./new-duty.component.css']
})
export class NewDutyComponent implements OnInit {

  newDuty:DutyType;
  @Input('duty')
  set Duty (duty:DutyType ){
    this.newDuty=duty;
  }
  @Input() addOrEditDutyFlag:boolean;



  alertFlag:boolean;
  alertMessage:string;

  selectedHospital:string;
  selectedHospitalID:number;
  Hospitals:Array<Hospital>
  @Output() call_parent_close_me=new EventEmitter();

  constructor(private userService:UserService,private dutyService:DutyService) {
    this.newDuty=new DutyType();
    this.getHospitals();
    this.selectedHospitalID=0;
    this.alertFlag=false;
  }

  ngOnInit() {
  }
  getHospitals(){
    this.userService.getHospitals().subscribe(
      data=>{this.Hospitals=data}
    )
  }
  getSelectedHospital(ele){
    this.selectedHospitalID=ele.currentTarget.value;
  }
  addNewDuty(){
    if(this.selectedHospitalID==0||this.newDuty.DutyType_Name==null){
      this.alertFlag=true;
      this.alertMessage="يجب ملأ جميع الحقول"
    }
    else{
      this.newDuty.hospital.ID=this.selectedHospitalID;
      this.dutyService.addNewDuty(this.newDuty).subscribe(
        data=>{
          this.closeThisComponent();
        }
      )
    }
  }
  editDuty(){
    console.log(this.selectedHospitalID)
    if(this.selectedHospitalID==0||this.newDuty.DutyType_Name==null){
      this.alertFlag=true;
      this.alertMessage="يجب ملأ جميع الحقول";
    }
    else{
      this.newDuty.hospital.ID=this.selectedHospitalID;
      this.dutyService.editNewDuty(this.newDuty).subscribe(
        data=>{
          console.log(data)
          this.closeThisComponent();
        }
      )
    }
  }
  closeThisComponent(){
    this.call_parent_close_me.next();
  }
}
