import { Component, OnInit, Input } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/user/user.model";
import { relativeTimeThreshold } from "moment";

@Component({
  selector: "app-navbar",
  styleUrls: ["./navbar.component.css"],
  templateUrl: "./navbar.component.html"
})
export class NavbarComponent {
  isAuthenticated = false
  private userSub: Subscription;
  isLoggedIn: any;
  json: any
  constructor(private authService: AuthService, private router: Router) {}

  @Input() apptitle: string;



  ngOnInit() {

   // this.isLoggedIn$ = this.authService.currentUser$
    console.log("logged in " + this.isLoggedIn)
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);

        })

   this.authService.getUserFromLocalStorage().subscribe(user => {
      console.log(user);
       this.json = user
     
    });
    console.log(this.isLoggedIn);
  
    
    
    
  }

  onLogout() {
    this.authService.userLogOut();
  }

  @Input() title: string;
  isNavbarCollapsed = true;
}
