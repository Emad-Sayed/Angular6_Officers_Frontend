import { Specialization } from "./Specialization";
import { Degree } from "./Degree";
import { Rank } from "./Rank";
import { Type } from "./Type";
import { Hospital } from "./Hospital";

export class User{
    ID:number;
    username:string;
    password:string;
    name:string;
    MyType:Type;
    MySpecialization:Specialization;
    MyDegree:Degree;
    MyRank:Rank;
    MyHospital:Hospital;
    constructor(){
        this.MyType=new Type();
        this.MySpecialization=new Specialization();
        this.MyDegree=new Degree();
        this.MyRank=new Rank();
        this.MyHospital=new Hospital();

    }
}