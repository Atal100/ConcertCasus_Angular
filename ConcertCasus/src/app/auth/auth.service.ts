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
  public currentUser$ = new BehaviorSubject<User>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
 

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router) {

       
      this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: User) => {
          if (user) {
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
    }
    

    loginUser(email: string, password: string) : Observable<User> {
      let options = {headers: new HttpHeaders({'Contect-Type': 'application/json'})}

      return this.http.post<User>(`${environment.apiUrl}/api/user/login`,
      { email: email, password: password},options
      )
       .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error: any) => {
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
    }

    


  register(user: User) {
    return this.http
      .post<User>(`${environment.apiUrl}/api/user/register`, user, { headers: this.headers})
      .pipe(
        map((user) => {    
          this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }


  userLogout(){
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
          this.alertService.success('You have been logged out.');
        } else {
        }
      })
      .catch((error) => console.log('not logged out!'));
  }


  

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER));
    return of(localUser);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: User) => (user ? user._id === itemUserId : false))
    );
  }

}
