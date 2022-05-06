import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public afs: AngularFirestore
  ) {
    /* Saving user data in localstorage when
  logged in and setting up null when logged out */
  this.afAuth.authState.subscribe((user) => {
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user')!);
    } else {
      localStorage.setItem('user', 'null');
      JSON.parse(localStorage.getItem('user')!);
    }
  }); }

  openSnackBar(message: string) {
    this._snackBar.open(message)
  }
  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        this.openSnackBar(error.message);
      });
    // return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  Register(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        this.openSnackBar(error.message);
      });
    // return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.openSnackBar('Logged out!');
    });
  }

  SetUserData(user: any) {
    console.log(user);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null /*&& user.emailVerified !== false*/) ? true : false;
  }

}
