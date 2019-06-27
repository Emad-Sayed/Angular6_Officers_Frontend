import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hospital } from 'src/app/models/Hospital';
import { DutyService } from 'src/app/services/duty.service';

@Component({
  selector: 'app-new-hospital',
  templateUrl: './new-hospital.component.html',
  styleUrls: ['./new-hospital.component.css']
})
export class NewHospitalComponent implements OnInit {

  newHospital:Hospital;
  @Input('hospital')
  set Duty (hospital:Hospital ){
    this.newHospital=hospital;
  }
  @Input() addOrEditHospitalFlag:boolean;



  alertFlag:boolean;
  alertMessage:string;

  selectedHospital:string;
  selectedHospitalID:number;
  Hospitals:Array<Hospital>
  @Output() call_parent_close_me=new EventEmitter();

  constructor(private dutyService:DutyService) {
    this.newHospital=new Hospital();
    this.alertFlag=false;
  }

  ngOnInit() {
  }
 

  addNewHospital(){
    if(this.newHospital.Hospital_Name==null){
      this.alertFlag=true;
      this.alertMessage="يجب ملأ جميع الحقول"
    }
    else{
      this.dutyService.addNewHospital(this.newHospital).subscribe(
        data=>{
          this.closeThisComponent();
        }
      )
    }
  }
  editHospital(){
    if(this.newHospital.Hospital_Name==null){
      this.alertFlag=true;
      this.alertMessage="يجب ملأ جميع الحقول"
    }
    else{
      this.dutyService.editNewHospital(this.newHospital).subscribe(
        data=>{
          this.closeThisComponent();
        }
      )
    }
  }
  closeThisComponent(){
    this.call_parent_close_me.next();
  }
}
