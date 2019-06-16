import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.css']
})
export class ShiftDetailsComponent implements OnInit {
  @Input() user_ID;
  @Input() cell_Number;
  @Input() user:User
  @Input() dutyTypeName;

  constructor() { }

  ngOnInit() {
  }
  cancelShift(){
    console.log("HERE")
  }
}
