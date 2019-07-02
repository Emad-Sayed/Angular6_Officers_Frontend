import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-searsh-filter',
  templateUrl: './searsh-filter.component.html',
  styleUrls: ['./searsh-filter.component.css']
})
export class SearshFilterComponent implements OnInit {
  SearchName:string;
  users:Array<User>
  selectedUser:User;
  selectedUserID:number;
  tableFlag:boolean;
  spinnerTable:boolean;
  @Output() BackWithData=new EventEmitter<User>();
  constructor(private userService:UserService) {
    this.tableFlag=true;
    this.spinnerTable=false;
   }

  ngOnInit() {
  }
  getUsers(){
    this.spinnerTable=true;
    this.userService.getUsersByName(this.SearchName).subscribe(
      data=>{
        this.users=data;
        this.spinnerTable=false;
        if(this.users.length==0){
          alert("مستخدم غير موجود")
        }
      },
      error=>{}
    )
  }
 
  backWithInfo(ele){
    this.selectedUserID=ele.currentTarget.id;
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].ID==this.selectedUserID){
        this.selectedUser=this.users[i];
        break;
      }
    }
    this.BackWithData.emit(this.selectedUser);
  }
}
