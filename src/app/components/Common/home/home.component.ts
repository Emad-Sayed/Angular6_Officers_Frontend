import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CRUD_Flag:boolean;
  constructor() {
    this.CRUD_Flag=false;
   }

  ngOnInit() {
  }
  showCRUDS_Buttons(){
    this.CRUD_Flag=true;
  }

}
