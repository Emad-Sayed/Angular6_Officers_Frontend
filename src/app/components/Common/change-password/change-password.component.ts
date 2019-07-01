import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  LoggedUser:User;
  router:Router;
  currentPassword:string;
  newPassword:string;
  confirmPassword:string;

  alertFlag:boolean;
  alertMessage:string;
  constructor(private router_ :Router, private loginService:LoginService) {
    this.LoggedUser=this.loginService.getLoggedUser();
    this.router=router_;
    this.alertFlag=false;
  }
  ngOnInit() {
  }
  changePassword(){
    if(this.LoggedUser.password!=this.currentPassword){
      this.alertFlag=true;
      this.alertMessage="كلمة السر الحالية غير صحيحة"
    }
    else if(this.newPassword!=this.confirmPassword){
      this.alertFlag=true;
      this.alertMessage="كلمة السر غير متطابقة"
    }
    else if(this.newPassword==undefined||this.newPassword.length<6||this.newPassword.length>16){
      this.alertFlag=true;
      this.alertMessage="كلمة السر اكبر من 8 حروف او ارقام و اقل من 16 "
    }
    else{
      this.LoggedUser.password=this.newPassword;
      this.loginService.changePassword(this.LoggedUser).subscribe(
        data=>{
          this.router.navigate(["/home"])
        }
      )
    }
    
  }
}
