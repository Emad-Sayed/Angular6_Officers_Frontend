import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Specialization } from 'src/app/models/Specialization';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-spetialization',
  templateUrl: './add-spetialization.component.html',
  styleUrls: ['./add-spetialization.component.css']
})
export class AddSpetializationComponent implements OnInit {

  @Input() ButtonFlag:boolean;
  @Input() selectedSpetial:Specialization;


  @Input('selectedSpetial')
  set Duty (spe:Specialization ){
    this.newSpetial=spe;
  }
  newSpetial:Specialization;

  alertFlag:boolean;
  alertMessage:string;
  @Output() call_parent_close_me=new EventEmitter();

  constructor(private userSerives:UserService) {
    this.alertFlag=false;
    this.newSpetial=new Specialization();
   }

  ngOnInit() {
    console.log(this.ButtonFlag)

  }
  submitSpetial(){
    if(this.newSpetial.Specialization_Name!=undefined){
      this.userSerives.addSpetial(this.newSpetial).subscribe(
        data=>{
          this.call_parent_close_me.next();
        }
      )
    }
    else{
      this.alertFlag=true;
      this.alertMessage="اسم تخصص غير صالح"
    }
  }
  editSpetial(){
      this.userSerives.editSpetial(this.newSpetial).subscribe(
        data=>{
          this.call_parent_close_me.next();
        }
      )

  }
  closeThisComponent(){
    this.call_parent_close_me.next();
  }
}
