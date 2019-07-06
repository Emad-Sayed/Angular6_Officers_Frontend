import { Component, OnInit } from '@angular/core';
import { Specialization } from 'src/app/models/Specialization';
import { UserService } from 'src/app/services/user.service';
import { DutyType } from 'src/app/models/DutyType';

@Component({
  selector: 'app-spetializations',
  templateUrl: './spetializations.component.html',
  styleUrls: ['./spetializations.component.css']
})
export class SpetializationsComponent implements OnInit {
  spetials:Array<Specialization>;
  spetialSpinner:boolean;
  addSpeital:boolean;
  addEdiSpetialFlag:boolean;
  selectedSpetial:Specialization;
  selectedSpetialID:number;
  constructor(private userSerive:UserService) {
    this.selectedSpetial=new Specialization();
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
    this.addEdiSpetialFlag=true;
  }
  editSpetial(ele){
    this.selectedSpetialID=ele.currentTarget.id;
    for(let i=0;i<this.spetials.length;i++){
      if(this.spetials[i].ID==this.selectedSpetialID){
        this.selectedSpetial=this.spetials[i];
        break;
      }
    this.addSpeital=true;
    this.addEdiSpetialFlag=false;
    }
  }
  deleteSpetial(ele){
    this.selectedSpetialID=ele.currentTarget.id;
    let con=confirm("تأكيد عملية المسح؟");
    if(con){
      for(let i=0;i<this.spetials.length;i++){
        if(this.spetials[i].ID==this.selectedSpetialID){
          this.selectedSpetial=this.spetials[i];
          break;
        }
      }
    this.userSerive.deleteSpetial(this.selectedSpetial).subscribe(
      data=>{
        this.getSpetials();
      },
      error=>{
        console.log(error)
        alert("لا يمكن مسح الخدمة")
      }
    )
  }

  }
  closeAddSpetialComponent(){
    this.addSpeital=false;
    this.getSpetials();
  }

}
