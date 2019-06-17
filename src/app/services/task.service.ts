import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from '../models/Shift';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  mainURL:string ="http://localhost:50135/api/shift/"
  URL:string;
  constructor(private http:HttpClient ) {}
  getShifts(Month:number,Year:number):Observable<Array<Array<Shift>>>{
    this.URL=this.mainURL+'GetShifts?month='+Month+"&year="+Year;
    return this.http.get<Array<Array<Shift>>>(this.URL);
  }

  addShift(shift:Shift){
    this.URL=this.mainURL+'postshift'
    return this.http.post(this.URL,shift);
  }
  addFirstShift(shift:Shift){
    this.URL=this.mainURL+'PostFirstShift'
    return this.http.post(this.URL,shift);
  }
  deleteShift(shift:Shift){
    this.URL=this.mainURL+'PostDeleteShift';
    return this.http.post(this.URL,shift);
  }

}
