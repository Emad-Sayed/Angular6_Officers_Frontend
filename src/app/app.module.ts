import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';

import { AppRoutingModule ,routingComponent} from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { TaskService } from './services/task.service';
import { DutyService } from './services/duty.service';
import { UserService } from './services/user.service';
import { ReportService } from './services/report.service';
import { AddUserComponent } from './components/SecondOption/add-user/add-user.component';
import { NewDutyComponent } from './components/FourthOption/new-duty/new-duty.component';
import { HospitalsDutiesComponent } from './components/FourthOption/hospitals-duties/hospitals-duties.component';
import { NewHospitalComponent } from './components/FourthOption/new-hospital/new-hospital.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    AddUserComponent,
    NewDutyComponent,
    HospitalsDutiesComponent,
    NewHospitalComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [LoginService,TaskService,DutyService,UserService,ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
