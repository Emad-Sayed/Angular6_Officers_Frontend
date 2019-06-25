import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  textSearch:string;
  selectedUserID:number;
  spinnerTable:boolean;
  users:Array<User>;
  updateFlag:boolean;
  constructor(private userService:UserService) {
    this.spinnerTable=true;
    this.updateFlag=false;
    this.getUsers();
   }

  ngOnInit() {
  }
getUsers(){
  this.userService.getUsers().subscribe(
    data=>{
      this.users=data;
      this.spinnerTable=false;
    },
    error=>{}
  )
}
Filter(){
  if(this.textSearch==""){
    this.spinnerTable=true;
    this.getUsers();
  }
  this.users=this.users.filter(
    res=>{return res.username.match(this.textSearch)}
  )
}
deleteUser(ele){
  this.selectedUserID=ele.currentTarget.id;
  var con=confirm("هل انت متأكد من حذف جميع بيانات المستخدم؟");
  if(con){
    this.userService.deleteUserHistory(this.selectedUserID).subscribe(
      data=>{
        this.getUsers();
      },
      error=>{}
    )
  }
}
updateUser(ele){
  this.selectedUserID=ele.currentTarget.id;
  this.updateFlag=true;

}
closeUpdateComponent(){
  this.updateFlag=false;
  this.getUsers();
}
detailsUser(ele){
  this.updateFlag=false;
  this.selectedUserID=ele.currentTarget.id;
}
addNewUser(){
}
}

