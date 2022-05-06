import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message)
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log(signInSuccessData)
    this.router.navigateByUrl('home');
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log(errorData)
    this.openSnackBar(errorData.code)
  }

  uiShownCallback() {
    console.log("callback")

  }


  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  async login() {
    this.authenticationService.SignIn(this.email.value, this.password.value).catch(error => {

        console.error(error);
      });
  }

  async register() {
    this.authenticationService.Register(this.email.value, this.password.value).catch(error => {
        console.error(error);
      });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }


}
