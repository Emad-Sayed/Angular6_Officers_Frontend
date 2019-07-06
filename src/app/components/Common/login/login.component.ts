import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router:Router;
  username:string;
  password:string;
  flagLogin:boolean;
  loginErrorNumber:number;

  constructor(router_:Router,private loginService:LoginService) {
    this.router=router_;
    this.flagLogin=false;
    this.loginErrorNumber=0;
   }
  ngOnInit() {
    if(this.loginService.isExist()){
      this.router.navigate(['/home']);

    }
  }
  login(){
    this.loginService.LoginCheck(this.username,this.password).subscribe(
      data=>{
        window.localStorage.setItem('user',JSON.stringify(data));
        this.router.navigate(['/home']);
      },
      error=>{ 
        console.log(error)
        this.loginErrorNumber++;
        this.flagLogin=true;
      },
    )
 }

}