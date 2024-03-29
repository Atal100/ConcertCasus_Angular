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
    constructor(private authService: AuthService, private router: Router) {}
  

    canActivate(route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot) {
      if (localStorage.getItem("currentuser")) {
        // logged in so return true
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  
  