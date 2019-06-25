import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mainURL:string ="http://localhost:50135/api/user/checklogin"
  header:HttpHeaders;
  constructor(private http:HttpClient) { 
    this.header=new HttpHeaders();
    this.header.append('Content-type',"application/json")
  }
  LoginCheck(username:string,password:string){
    return this.http.post(this.mainURL,{'username':username,'password':password},{headers:this.header});
  }
  isExist(){
    if(window.localStorage.getItem('user')===null)
    return false;
    return true;
  }
  getLoggedUser(){
    return JSON.parse(window.localStorage.getItem('user'));
  }
}
