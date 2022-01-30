import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username = "";
  private loginInfo: AuthLoginInfo = new AuthLoginInfo("", "");

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      location.href = "/home";
    }
  }

  onSubmit() {
    if(this.form.username && this.form.password) {
      this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password);

      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUsername(data.username);
          this.username = data.username;

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          location.href = "/home";
        },
        error => {
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }

}
