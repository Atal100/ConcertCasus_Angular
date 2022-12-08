import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";
import { User } from "../../user/user.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService } from "../../alerts/alert.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,

    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    //Login status resetten
    this.authService.userLogOut;
  }

  public get fields() {
    return this.loginForm.controls;
  }

  onSubmit(): void  {
    try {
      if (this.loginForm.valid) {
        this.submitted = true;
  
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
  
        this.authService
          .userLogin(email, password)
          // .pipe(delay(1000))
          .subscribe((user: any) => {
            if (user) {
              console.log('Logged in');
              this.router.navigate(['/']);
              this.alertService.success("Login successful");
            }
            this.submitted = false;
          });
      } else {
        this.submitted = false;
        console.error('loginForm invalid');
        this.alertService.error("Login failed because the form was invalid")
      }
      
    } catch (error) {
      this.alertService.error("Login failed");
      
    }
   
  }

  }
