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
  constructor(private authService: AuthService, private router: Router) { }

  @Input() apptitle: string;




  ngOnInit() {
    console.log("called in")
    
        console.log("test" + this.authService.getUserFromLocalStorage())
        if(this.authService.getUserFromLocalStorage() != null){
          this.isLoggedIn = this.authService.isLoggedInUser
        }
       
      }




  onLogout() {
    console.log("called out")
    this.authService.userLogOut();


  }

  @Input() title: string;
  isNavbarCollapsed = true;
}
