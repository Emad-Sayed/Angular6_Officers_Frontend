import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  router:Router;
  LoggedUser:User;
  textSearch:string;
  selectedUserID:number;
  selectedUser:User;
  spinnerTable:boolean;
  users:Array<User>;
  updateFlag:boolean;
  newUserFlag:boolean;
  constructor(router_:Router,private userService:UserService,private logedService:LoginService) {
    this.router=router_;
    this.LoggedUser=logedService.getLoggedUser();
    if(this.LoggedUser.MyType.Type_Name!="ادمن"){
      this.router.navigate(["/home"]);
    }
    this.spinnerTable=true;
    this.updateFlag=false;
    this.newUserFlag=false;
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
    for(let i=0;i<this.users.length;i++){
      if(this.selectedUserID==this.users[i].ID){
        this.selectedUser=this.users[i];
      }
    }
    this.userService.deleteUserHistory(this.selectedUser).subscribe(
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
closeAddComponent(){
  this.newUserFlag=false;
  this.getUsers();
}
addNewUser(){
  this.updateFlag=false;
  this.newUserFlag=true;
}
}

