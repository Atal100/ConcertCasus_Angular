import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { map, tap, retry, catchError } from "rxjs/operators";
import { User } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  users: User[];

  usersAvailable = new BehaviorSubject<boolean>(false);

  private userUrl = "https://concertcasus.onrender.com"
 

  constructor(private http: HttpClient) {
    console.log("UserService constructed");
    console.log(`Connected to ${environment.apiUrl}`);
  }

  public getUsers(): Observable<User[]> {
    console.log("getUsers");
    return this.http.get<User[]>( this.userUrl + '/api/user', {});
  }

  getUser(id: string) {
    console.log(`getUser(${id})`);
    return this.http.get<User>(this.userUrl + '/api/user/' + id);
  }

  

  updateUser(user: User) {
    console.log("updateUser");

    return this.http.put(this.userUrl + '/api/user/' + user._id, user);
  }

  private handleError(error: HttpErrorResponse) {
    console.log("handleError" + error.message);

    return throwError(error.message || error.error.message);
  }
}

export interface ApiResponse {
  results: any[];
}
