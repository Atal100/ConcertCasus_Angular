import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from "@angular/router";
  import { AuthService } from "./auth.service";
  import { Injectable } from "@angular/core";
  
  @Injectable({
    providedIn: "root"
  })
  export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem("currentUser")) {
        // logged in so return true
        console.log('Authguard' + localStorage.length)
        return true;
      }
      console.log("Authguard uitgelogd")
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  