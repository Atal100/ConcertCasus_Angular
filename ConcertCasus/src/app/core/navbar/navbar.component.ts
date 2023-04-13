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
  isLoggedIn: any;
  loggedInUser$: Observable<User>;
  constructor(private authService: AuthService, private router: Router) { }

  @Input() apptitle: string;




  ngOnInit() {


    this.loggedInUser$ = this.authService.currentUser$;
  }





  onLogout() {

  
    this.authService.userLogout();
    


  }

  @Input() title: string;
  isNavbarCollapsed = true;
}
