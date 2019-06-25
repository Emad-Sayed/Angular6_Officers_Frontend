import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from '../models/Shift';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  mainURL:string ="http://localhost:50135/api/report"
  constructor(private http:HttpClient) { }
  getReportDetails(hospitalName:string,day:number,month:number,year:number):Observable<Array<Shift>>{
    let URL=this.mainURL+"/Get_Hospital_Report?hospitalName="+hospitalName+"&day="+day+"&month="+month+"&year="+year;
    return this.http.get<Array<Shift>>(URL);
  }
}
