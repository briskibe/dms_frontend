import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private _snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.loginForm.value) {
      this.authService.login(this.loginForm.value["username"], this.loginForm.value["password"])
        .subscribe((res) => {
          localStorage.setItem('token', res.accessToken);
          this.authService.setUserAuthenticated();

          this.router.navigate(['/dashboard']);

        }, () => {

          this._snackbar.open("Neuspješna prijava", "OK", { duration: 2000 });

        })
    }
  }
}
