import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(Auth);

  isLogedIn(){
    return localStorage.getItem('token') ? true : false;
  }

  isAdmin(){
    return localStorage.getItem('role') === 'ADMIN' ? true : false;
  }

  logoutUser(){
    this.authService.logout();
    return;
  }
}
