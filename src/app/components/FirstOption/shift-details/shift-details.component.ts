import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';
import { TaskService } from 'src/app/services/task.service';
import { Shift } from 'src/app/models/Shift';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.css']
})
export class ShiftDetailsComponent implements OnInit {
  @Input() user_ID;
  @Input() cell_Number;
  @Input() shift_id
  @Input() user:User
  @Input() dutyTypeName;
  @Input() month;
  @Input() year;
  shiftDeleted:Shift
  @Output() updateShiftParent =new EventEmitter();
  @Output() closeComponent =new EventEmitter();
  alertFlag: boolean=false;
  constructor(private taskService:TaskService) {
    this.shiftDeleted=new Shift();

   }

  ngOnInit() {
    this.shiftDeleted.ID=this.shift_id;
    this.shiftDeleted.User_.ID=this.user_ID;
    this.shiftDeleted.DutyNum=this.cell_Number;

    this.shiftDeleted.Month=this.month;
    this.shiftDeleted.Year=this.year;
  }
  cancelShift(){
    var confirm=window.confirm("تأكيد عملية الحذف؟")
    if(confirm){
      this.taskService.deleteShift(this.shiftDeleted).subscribe(
        data=>{
          this.updateShiftParent.next();
        },
        error=>{this.alertFlag=true}
      )
    }
  }
  closeThisComponent(){
    this.alertFlag=false;
    this.closeComponent.next();
  }
}
