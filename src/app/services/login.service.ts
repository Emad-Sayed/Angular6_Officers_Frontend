import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { ServerDomain, LocalDomain } from './Configration';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mainURL:string =ServerDomain+"/api/user/"
  header:HttpHeaders;
  constructor(private http:HttpClient) { 
    this.header=new HttpHeaders();
    this.header.append('Content-type',"application/json")
  }
  LoginCheck(username:string,password:string){
    let URL=this.mainURL+"checklogin"
    console.log(URL)
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