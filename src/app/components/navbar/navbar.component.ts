import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  router:Router
  constructor(router_:Router,private loginCheck:LoginService) { 
    this.router=router_;
  }

  ngOnInit() {
    if(!this.loginCheck.isExist())
    this.router.navigate([""])
  }
  LoggOut(){
    window.localStorage.removeItem('user');
    this.router.navigate([""]);
  }
}
