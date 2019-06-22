import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/FirstOption/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyfooterComponent } from './components/myfooter/myfooter.component';
import { TasksComponent } from './components/FirstOption/tasks/tasks.component';
import { ShiftFormComponent } from './components/FirstOption/shift-form/shift-form.component';
import { ShiftDetailsComponent } from './components/FirstOption/shift-details/shift-details.component';
import { FirstShiftComponent } from './components/FirstOption/first-shift/first-shift.component';
import { UsersTableComponent } from './components/SecondOption/users-table/users-table.component';

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
  }
  ] },
  {path:'shift',component:ShiftFormComponent},
  {path: '**',redirectTo: '',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
export const routingComponent=[LoginComponent,NavbarComponent,HomeComponent,MyfooterComponent,
  TasksComponent,ShiftFormComponent,ShiftDetailsComponent,FirstShiftComponent,UsersTableComponent]
