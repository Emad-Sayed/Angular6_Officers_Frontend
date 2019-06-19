import { Specialization } from "./Specialization";
import { Degree } from "./Degree";
import { Rank } from "./Rank";
import { Type } from "./Type";

export class User{
    ID:number;
    username:string;
    password:string;
    name:string;
    MyType:Type;
    MySpecialization:Specialization;
    MyDegree:Degree;
    MyRank:Rank;
    constructor(){
        this.MyType=new Type();
        this.MySpecialization=new Specialization();
        this.MyDegree=new Degree();
        this.MyRank=new Rank();

    }
}