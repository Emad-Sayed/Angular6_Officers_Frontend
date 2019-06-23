import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  mainURL:string ="http://localhost:50135/api/user";
  constructor(private http:HttpClient) { }
  getUser(id:number):Observable<User>{
    return this.http.get<User>(this.mainURL+"/getuser?id="+id);
  }
  getUsers():Observable<Array<User>>{
    let URL:string=this.mainURL+"/getusers";
    return this.http.get<Array<User>>(URL);
  }
  DeleteUserHistory(id:number){
    let URL=this.mainURL+"/delete_userhistory?id="+id;
    return this.http.delete(URL);
  }
  EditUserInfo(user:User){
    let URL=this.mainURL+"/post_edituserinfo";
    return this.http.post(URL,user);
  }
  getUsersByName(name:string):Observable<Array<User>>{
    let URL=this.mainURL+"/getUsersByName?name="+name;
    return this.http.get<Array<User>>(URL);
  }
}
