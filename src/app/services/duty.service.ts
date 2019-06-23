import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DutyType } from '../models/DutyType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DutyService {
  mainURL:string ="http://localhost:50135/api/duty/"
  URL:string;
  constructor(private http:HttpClient ) {}
  getDuties(id:number):Observable<Array<DutyType>>{
    this.URL=this.mainURL+'/GetDuties?id='+id;
    return this.http.get<Array<DutyType>>(this.URL);
  }

  addShift(duty:DutyType){
  }
}
