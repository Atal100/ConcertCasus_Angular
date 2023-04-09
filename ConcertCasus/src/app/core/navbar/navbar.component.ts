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
  constructor(private authService: AuthService, private router: Router) {}

  @Input() apptitle: string;



  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
       this.isLoggedIn = this.authService.isLoggedInUser;
      }
    })
  }

  onLogout() {
    this.authService.userLogOut();
    this.authService.isLoggedInUser = false
    this.ngOnInit()
  }

  @Input() title: string;
  isNavbarCollapsed = true;
}
