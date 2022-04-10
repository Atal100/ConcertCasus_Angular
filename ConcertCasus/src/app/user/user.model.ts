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
  public id: number;
  public name: {
    title: string;
    firstName: string;
    lastName: string;
  };
  public email: string;
  public password: string;

  roles: UserRole[] = [UserRole.Basic];

  constructor(values = {}) {
    Object.assign(this, values);
  }
  public hasRole(rolename: UserRole): Observable<boolean> {
    return from(this.roles).pipe(
      map(val => val === rolename),
      reduce((a, b) => a || b)
    );
  }
}
