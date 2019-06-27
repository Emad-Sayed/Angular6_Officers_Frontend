import { Hospital } from "./Hospital";

export class DutyType{
    ID:number;
    DutyType_Name:string;
    hospital:Hospital;
    constructor(){
        this.hospital=new Hospital();
    }
}