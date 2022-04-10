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

  onSubmit() {
    this.submitted = true;
    console.log("onSubmit");
    console.log(this.loginForm);

    if (this.loginForm.invalid) {
      return console.log("called when invalid");
    }
    console.log("Good Way");
    this.loading = true;
    this.authService
      .userLogin(this.fields['email'].value, this.fields['password'].value)
      .pipe(first())
      .subscribe(
        () => {
          console.log("route");
          this.router.navigate(["/dashboard"]);
        },
        (error: string) => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
