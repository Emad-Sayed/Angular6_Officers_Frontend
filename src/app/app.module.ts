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

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [LoginService,TaskService,DutyService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
