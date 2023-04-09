import { Pipe, PipeTransform } from "@angular/core";
import { Observable, from } from "rxjs";
import { map, reduce } from "rxjs/operators";

export enum UserRole {
  Basic = 0,
  User = 1,
  Artist = 2,
  Eventplanner = 3
}

const userRoleNames = ["Basic"];
@Pipe({ name: "asRole" })
export class UserRoleNamePipe implements PipeTransform {
  transform(roleNr: number) {
    return userRoleNames[roleNr];
  }
}
export class User {
  public id: string;
  public firstname: string;
  public lastname: string;

  public email: string;
  public password: string;



  constructor(values = {}) {
    Object.assign(this, values);
  }

  
}
