import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User, UserRole } from "../user/user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { map, tap, catchError, switchMap } from "rxjs/operators";
import { AlertService } from "src/app/alerts/alert.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {

  public isLoggedInUser = new BehaviorSubject<User>(undefined);
  public currentUser$ = new BehaviorSubject<User>(undefined);
  token: string;
  private readonly CURRENT_USER = 'currentUser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router) {


    this.getUserFromLocalStorage()
    .pipe(
     
      switchMap((user: User) => {
        if (user) {
          console.log('User found in local storage ' + user.id);
          this.currentUser$.next(user);
        
          return of(user);
        } else {
          console.log(`No current user found`);
          return of(undefined);
        }
      })
    )
    .subscribe(() => console.log('Startup auth done'));
    }

    userLogin(email: string, password: string): any {
      return this.http
        .post<User>(`${environment.apiUrl}/api/user/login`, {
          email,
          password
        })
        .pipe(
          map(user => {
            console.log("user.login before if");
  
            if (user) {
              console.log("after login if");
              this.currentUser$.next(user);
              localStorage.setItem("currentUser", JSON.stringify(user));
            }
            return user;
          }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  register(user: User) {
    console.log("createUser");
    console.log('user', user)
    return this.http
      .post<User>(`${environment.apiUrl}/api/user/register`, user, {})
      .pipe(
        map((user) => {
   
          console.dir(user);
    
          this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  userLogOut() {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem("currentUser");
          this.currentUser$.next(undefined);
          this.alertService.success('You have been logged out.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getToken() {
    return this.token;
  }

  // get userIsLoggedIn(): Observable<boolean> {
  //   console.log("userIsLoggedIn() " + this.isLoggedInUser.value);
  //   return this.isLoggedInUser.asObservable();
  // }

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem("currentUser"));
    return of(localUser);
  }
  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: User) => (user ? user.id === itemUserId : false))
    );
  }


}
