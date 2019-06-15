import { User } from "./User";
import { DutyType } from "./DutyType";

export class Shift{
    ID:number;
    DutyNum:number;
    User_:User;
    Date:string;
    DutyType_:DutyType;
    Month:number;
    Year:number
    constructor(){
        this.User_=new User();
        this.DutyType_=new DutyType()
    }
}