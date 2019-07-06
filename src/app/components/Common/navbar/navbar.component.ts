import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  LoggedUser:User;
  router:Router;
  constructor(router_:Router,private loginCheck:LoginService) { 
    this.router=router_;
  }

  ngOnInit() {
    if(!this.loginCheck.isExist())
    this.router.navigate([''])
    else
    this.LoggedUser=this.loginCheck.getLoggedUser();
  }
  LoggOut(){
    window.localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
