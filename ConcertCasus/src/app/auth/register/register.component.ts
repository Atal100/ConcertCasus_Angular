import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user/user.service";
import { AlertService } from "../../alerts/alert.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value)

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.register(this.registerForm.value)
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
        this.alertService.success("Registration successful", true);
        this.router.navigate(["/login"]);
      }
   );
  }
}
