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

  public isLoggedInUser = false
  public currentUser$: any
 

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router) {
      console.log(" test")

       
    this.currentUser$ = this.getUserFromLocalStorage()
    if(this.currentUser$ != null){
      console.log("logged uin")
      this.isLoggedInUser = true
 
  }
    }
    

    loginUser(email: string, password: string) : any{
      let loginInfo = {email, password}
       let options = {headers: new HttpHeaders({'Contect-Type': 'application/json'})}
      return this.http.post(`${environment.apiUrl}/api/user/login`,loginInfo,options)
      .pipe(tap(data => {
        this.currentUser$ = data
        
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser$.user));
        return this.currentUser$
      }))
      .pipe(catchError( err => {
        this.alertService.error(err.error.message || err.message);
        return of (false)
      }))
    }


  register(user: User) {
    return this.http
      .post<User>(`${environment.apiUrl}/api/user/register`, user, {})
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

  userLogOut() {
    this.currentUser$ = null;
    this.router
      .navigate(['/login'])
      .then((success) => {
       
        if (success) {
          console.log("removed")
          localStorage.removeItem("currentUser");
          this.currentUser$ = null;
          this.isLoggedInUser = false;
       
          this.alertService.success('You have been logged out.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }


  

  getUserFromLocalStorage(): User {
    const localUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(localUser)
    return <User>localUser;
  }
isAuthenticated(){
  return !!this.currentUser$
}


  // userMayEdit(itemUserId: string): Observable<boolean> {
  //   return this.currentUser$.pipe(
  //     map((user: User) => (user ? user.id === itemUserId : false))
  //   );
  // }


}
