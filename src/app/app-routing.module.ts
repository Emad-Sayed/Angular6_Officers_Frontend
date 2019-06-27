import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Common/login/login.component';
import { HomeComponent } from './components/Common/home/home.component';
import { NavbarComponent } from './components/Common/navbar/navbar.component';
import { MyfooterComponent } from './components/Common/myfooter/myfooter.component';
import { TasksComponent } from './components/FirstOption/tasks/tasks.component';
import { ShiftFormComponent } from './components/FirstOption/shift-form/shift-form.component';
import { ShiftDetailsComponent } from './components/FirstOption/shift-details/shift-details.component';
import { FirstShiftComponent } from './components/FirstOption/first-shift/first-shift.component';
import { UsersTableComponent } from './components/SecondOption/users-table/users-table.component';
import { SearshFilterComponent } from './components/FirstOption/searsh-filter/searsh-filter.component';
import { UserDetailsComponent } from './components/SecondOption/user-details/user-details.component';
import { BatnaAlbReportComponent } from './components/ThirdOption/batna-alb-report/batna-alb-report.component';
import { HospitalsDutiesComponent } from './components/FourthOption/hospitals-duties/hospitals-duties.component';

const routes: Routes = [
  { path: '', component:LoginComponent  },
  { path: 'home', component:NavbarComponent,children:[
  {
    path:'',component:HomeComponent,
  },
  {
    path:'tasks',component:TasksComponent
  },
  {
    path:'users',component:UsersTableComponent
  },

  {
    path:'hospitals_duties',component:HospitalsDutiesComponent
  },

  ] },
  {path:'shift',component:ShiftFormComponent},
  {path:'batna_alb_report',component:BatnaAlbReportComponent},

  {path: '**',redirectTo: '',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
export const routingComponent=[LoginComponent,NavbarComponent,HomeComponent,MyfooterComponent,
  TasksComponent,ShiftFormComponent,ShiftDetailsComponent,FirstShiftComponent,UsersTableComponent,
SearshFilterComponent,UserDetailsComponent,BatnaAlbReportComponent,HospitalsDutiesComponent,]
