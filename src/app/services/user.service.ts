import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Rank } from '../models/Rank';
import { Specialization } from '../models/Specialization';
import { Degree } from '../models/Degree';
import { Hospital } from '../models/Hospital';
import { ServerDomain, LocalDomain } from './Configration';
import { Type } from '../models/Type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  mainURL:string =LocalDomain+"/api/user";
  constructor(private http:HttpClient) { }
  getUser(id:number):Observable<User>{
    return this.http.get<User>(this.mainURL+"/getuser?id="+id);
  }
  getUsers():Observable<Array<User>>{
    let URL:string=this.mainURL+"/getusers";
    return this.http.get<Array<User>>(URL);
  }
  deleteUserHistory(user:User){
    let URL=this.mainURL+"/Post_DeleteUserHistory";
    return this.http.post(URL,user);
  }
  updateUser(user:User){
    let URL=this.mainURL+"/post_edituserinfo";
    return this.http.post(URL,user);
  }
  addUser(user:User){
    let URL=this.mainURL+"/Post_AddUser";
    return this.http.post(URL,user);
  }
  getUsersByName(name:string):Observable<Array<User>>{
    let URL=this.mainURL+"/getUsersByName?name="+name;
    return this.http.get<Array<User>>(URL);
  }
  getTypes():Observable<Array<Type>>{
    let URL=this.mainURL+"/Get_Types";
    return this.http.get<Array<Type>>(URL);
  }
    getRanks():Observable<Array<Rank>>{
    let URL=this.mainURL+"/GetRanks";
    return this.http.get<Array<Rank>>(URL);
  }
  getSpetialization():Observable<Array<Specialization>>{
    let URL=this.mainURL+"/GetSpetializations";
    return this.http.get<Array<Specialization>>(URL);
  }
  getDegree():Observable<Array<Degree>>{
    let URL=this.mainURL+"/getdegrees";
    return this.http.get<Array<Degree>>(URL);
  }
  getHospitals():Observable<Array<Hospital>>{
    let URL=this.mainURL+"/GetHospitals";
    return this.http.get<Array<Hospital>>(URL);
  }
  getSpetials():Observable<Array<Specialization>>{
    let URL=this.mainURL+"/GetSpetials";
    return this.http.get<Array<Specialization>>(URL);   
  }
  addSpetial(Spetial:Specialization){
    let URL=this.mainURL+"/AddSpetial";
    return this.http.post(URL,Spetial);  
  }
  editSpetial(Spetial:Specialization){
    let URL=this.mainURL+"/EditSpetial";
    return this.http.post(URL,Spetial);  
  }
  deleteSpetial(speial:Specialization){
    let URL=this.mainURL+"/Post_DeleteSpetial";
    return this.http.post(URL,speial);  
  }
}