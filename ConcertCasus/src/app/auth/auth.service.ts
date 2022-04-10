import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User, UserRole } from "../user/user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { map, tap, catchError } from "rxjs/operators";
import { AlertService } from "src/app/alerts/alert.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
  public isLoggedInUser = new BehaviorSubject<boolean>(false);
  token: string;

  constructor(private http: HttpClient) {}

  userLogin(email: string, password: string): any {
    return this.http
      .post<any>(`${environment.apiUrl}/api/users/authenticate`, {
        email,
        password
      })
      .pipe(
        map(user => {
          console.log("user.login before if");

          if (user && user.token) {
            console.log("after login if");
            this.isLoggedInUser.next(true);
            localStorage.setItem("currentUser", JSON.stringify(user));
          }
          return user;
        })
      );
  }

  userLogOut() {
    localStorage.removeItem("currenUser");

    this.isLoggedInUser.next(false);
  }

  getToken() {
    return this.token;
  }

  get userIsLoggedIn(): Observable<boolean> {
    console.log("userIsLoggedIn() " + this.isLoggedInUser.value);
    return this.isLoggedInUser.asObservable();
  }
}
