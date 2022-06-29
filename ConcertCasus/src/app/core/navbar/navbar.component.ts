import { Component, OnInit, Input } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/user/user.model";

@Component({
  selector: "app-navbar",
  styleUrls: ["./navbar.component.css"],
  templateUrl: "./navbar.component.html"
})
export class NavbarComponent {
  isAuthenticated = false
  private userSub: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  @Input() apptitle: string;
  isLoggedIn$: Observable<User>;


  ngOnInit() {

    this.isLoggedIn$ = this.authService.currentUser$
    console.log("logged in " + this.isLoggedIn$)
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
        })
    
    
    
  }

  onLogout() {
    this.authService.userLogOut();
  }

  @Input() title: string;
  isNavbarCollapsed = true;
}
