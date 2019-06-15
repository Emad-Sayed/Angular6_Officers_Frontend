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
    return this.http.get<User>(this.mainURL+"/getuser?id="+id)
  }
}
