import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DutyType } from '../models/DutyType';
import { Observable } from 'rxjs';
import { Hospital } from '../models/Hospital';

@Injectable({
  providedIn: 'root'
})
export class DutyService {
  mainURL:string ="http://localhost:50135/api/duty/"
  constructor(private http:HttpClient ) {}
  getDuties(id:number):Observable<Array<DutyType>>{
    let URL=this.mainURL+'/GetDuties?id='+id;
    return this.http.get<Array<DutyType>>(URL);
  }
  getAllDuties(pageNum:number):Observable<Array<DutyType>>{
    let URL=this.mainURL+'GetAllDuties?pageNum='+pageNum;
    return this.http.get<Array<DutyType>>(URL);
  }
  addNewDuty(newDuty){
    let URL=this.mainURL+'/AddDuty';
    return this.http.post(URL,newDuty);
  }
  editNewDuty(newDuty){
    let URL=this.mainURL+'/EditDuty';
    return this.http.post(URL,newDuty);
  }
  addNewHospital(newHospital:Hospital){
    let URL=this.mainURL+'/AddHospital';
    return this.http.post(URL,newHospital);
  }
  editNewHospital(newHospital:Hospital){
    let URL=this.mainURL+'/EditHospital';
    return this.http.post(URL,newHospital);
  }

}
