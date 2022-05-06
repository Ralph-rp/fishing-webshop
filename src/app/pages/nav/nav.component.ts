import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void { }

  public logout(): void {
    this.authenticationService.SignOut()
    this.router.navigateByUrl('login');
  }

  public cart(): void {
    this.router.navigateByUrl('cart');
  }
}
