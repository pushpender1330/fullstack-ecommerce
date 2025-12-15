import { Component, inject } from '@angular/core';
import { Route, Router, RouterLink } from "@angular/router";
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(Auth);
  constructor(private router: Router){}

  isLogedIn(){
    return localStorage.getItem('token') ? true : false;
  }

  isAdmin(){
    return localStorage.getItem('role') === 'ADMIN' ? true : false;
  }

  logoutUser(){
    this.authService.logout();
    this.router.navigate(['/'])
    return;
  }
}
