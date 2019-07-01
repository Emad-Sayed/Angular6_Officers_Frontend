import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LoogedUser:User;
  isAdmin:boolean;
  CRUD_Flag:boolean;
  constructor(loginCheck:LoginService) {
    this.LoogedUser=loginCheck.getLoggedUser();
    if(this.LoogedUser.MyType.Type_Name=="ادمن"){
      this.isAdmin=true;
    }
    else{
      this.isAdmin=false;
    }
    this.CRUD_Flag=false;
   }

  ngOnInit() {
  }
  showCRUDS_Buttons(){
    this.CRUD_Flag=true;
  }

}
