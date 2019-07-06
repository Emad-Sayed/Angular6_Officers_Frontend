import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/models/Shift';
import { ReportService } from 'src/app/services/report.service';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-batna-alb-report',
  templateUrl: './batna-alb-report.component.html',
  styleUrls: ['./batna-alb-report.component.css']
})
export class BatnaAlbReportComponent implements OnInit {

  englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  arabicNumbers = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];


  dateString:string;
  newdateObject:Date;
  day:number;
  month:number;
  year:number;

  arabicDay:string;
  arabicMonth:string;
  arabicYear:string;
  

  LogedUsed:User;

  batnaShifts:Array<Shift>;
  est2balShifts:Array<Shift>;

  batnaSpinner:boolean;
  est2balSpinner:boolean;

  grahaShifts:Array<Shift>;
  albShifts:Array<Shift>;

  grahaSpinner:boolean;
  albSpinner:boolean;

  kelaShifts:Array<Shift>;
  eyonShifts:Array<Shift>;

  kelaSpinner:boolean;
  eyonSpinner:boolean;

  sadrShifts:Array<Shift>;
  asnanShifts:Array<Shift>;

  sadrSpinner:boolean;
  asnanSpinner:boolean;

  aksamShifts:Array<Shift>;
  aksamSpinner:boolean;
  PrintReady:boolean;

  constructor(private reportService:ReportService,private loginService:LoginService) {

    this.PrintReady=true;
    this.batnaSpinner=true;
    this.est2balSpinner=true;
    this.grahaSpinner=true;
    this.albSpinner=true;
    this.kelaSpinner=true;
    this.eyonSpinner=true;
    this.sadrSpinner=true;
    this.asnanSpinner=true;
    this.aksamSpinner=true;
    this.getCurrentDate();
    this.LogedUsed=this.loginService.getLoggedUser();
    

   }

  ngOnInit() {
  }
  getCurrentDate(){
    this.day = new Date().getDate();
    this.month  = new Date().getMonth()+1;
    this.year  = new Date().getUTCFullYear();

  }

  getReports(){
    this.arabicDay= this.convertNumberToArabic(this.day)
    this.arabicMonth= this.convertNumberToArabic(this.month)
    this.arabicYear= this.convertNumberToArabic(this.year)
    this.PrintReady=false;
    this.getReportDataBatna();
    this.getReportDataEst2bal();

    this.getReportDataGraha();
    this.getReportDataAlb();

    this.getReportDataKela();
    this.getReportDataEyon();

    this.getReportDataSadr();
    this.getReportDataAsnan();

    this.getReportDataAksam();
  }
  getReportDataBatna(){
    this.reportService.getReportDetails("باطنة",this.day,this.month,this.year).subscribe(
      data=>{
        this.batnaShifts=data;
        this.batnaSpinner=false;
      },
      error=>{}
    )
  }
  getReportDataEst2bal(){
    this.reportService.getReportDetails("استقبال",this.day,this.month,this.year).subscribe(
      data=>{
        this.est2balShifts=data;
        this.est2balSpinner=false;
      },
      error=>{}
    )
  }
  getReportDataGraha(){
    this.reportService.getReportDetails("جراحة",this.day,this.month,this.year).subscribe(
      data=>{
        this.grahaShifts=data;
        this.grahaSpinner=false;
      },
      error=>{}
    )
  }

  getReportDataAlb(){
    this.reportService.getReportDetails("قلب",this.day,this.month,this.year).subscribe(
      data=>{
        this.albShifts=data;
        this.albSpinner=false;
      },
      error=>{}
    )
  }
  getReportDataKela(){
    this.reportService.getReportDetails("كلي",this.day,this.month,this.year).subscribe(
      data=>{
        this.kelaShifts=data;
        this.kelaSpinner=false;
      },
      error=>{}
    )
  }
  getReportDataEyon(){
    this.reportService.getReportDetails("عيون تخصصي",this.day,this.month,this.year).subscribe(
      data=>{
        this.eyonShifts=data;
        this.eyonSpinner=false;
      },
      error=>{}
    )
  }
  getReportDataSadr(){
    this.reportService.getReportDetails("صدر",this.day,this.month,this.year).subscribe(
      data=>{
        this.sadrShifts=data;
        this.sadrSpinner=false;
      },
      error=>{}
    )
  }
  getReportDataAsnan(){
    this.reportService.getReportDetails("اسنان تخصصي",this.day,this.month,this.year).subscribe(
      data=>{
        this.asnanShifts=data;
        this.asnanSpinner=false;
      },
      error=>{}
    )
  }
  getReportDataAksam(){
    this.reportService.getReportDetails("اقسام مساعدة",this.day,this.month,this.year).subscribe(
      data=>{
        this.aksamShifts=data;
        this.aksamSpinner=false;
      },
      error=>{}
    )
  }
  convertNumberToArabic(num){
    let tempNum=num.toString();
    let arabicNum="";
    for(var j=0;j<tempNum.length;j++){
      for(var i=0;i<this.englishNumbers.length;i++){
        if(tempNum[j]==this.englishNumbers[i])
        arabicNum +=""+ this.arabicNumbers[i]
      }
    }
    
    return arabicNum;

  }

}
