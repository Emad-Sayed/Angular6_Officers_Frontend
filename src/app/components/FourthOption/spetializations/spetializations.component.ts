import { Component, OnInit } from '@angular/core';
import { Specialization } from 'src/app/models/Specialization';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-spetializations',
  templateUrl: './spetializations.component.html',
  styleUrls: ['./spetializations.component.css']
})
export class SpetializationsComponent implements OnInit {
  spetials:Array<Specialization>;
  spetialSpinner:boolean;
  addSpeital:boolean;
  constructor(private userSerive:UserService) {
    this.spetialSpinner=true;
    this.addSpeital=false;
    this.getSpetials();
   }

  ngOnInit() {
  }
  getSpetials(){
    this.userSerive.getSpetials().subscribe(
      data=>{
        this.spetials=data;
        this.spetialSpinner=false;
      }
    )
  }
  addNewSpetial(){
    this.addSpeital=true;
  }
  closeAddSpetialComponent(){
    this.addSpeital=false;
    this.getSpetials();
  }

}
