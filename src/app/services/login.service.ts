import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mainURL:string ="http://localhost:50135/api/user/"
  header:HttpHeaders;
  constructor(private http:HttpClient) { 
    this.header=new HttpHeaders();
    this.header.append('Content-type',"application/json")
  }
  LoginCheck(username:string,password:string){
    let URL=this.mainURL+"checklogin"
    return this.http.post(URL,{'username':username,'password':password},{headers:this.header});
  }
  changePassword(user:User){
    let URL=this.mainURL+"changepassword"
    return this.http.post(URL,user);
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