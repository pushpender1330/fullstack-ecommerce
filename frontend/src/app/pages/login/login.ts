import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(private toastr: ToastrService){}

  authService = inject(Auth);
  private router = inject(Router);

  loginForm = new FormGroup({
    email : new FormControl<string>('',{nonNullable: true,validators:[Validators.required,Validators.email]}),
    password : new FormControl<string>('',{nonNullable: true,validators:[Validators.required]})
  })

  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (resp) => {
        this.toastr.success(resp?.message);
        if(resp.token){
          localStorage.setItem('token',resp?.token);
          this.router.navigate(['/']);
          localStorage.setItem('role',resp?.role);
          localStorage.setItem('name',resp?.name);
        }
      },
      error: (err) => {
        this.toastr.error(err?.error?.message);
      }
    })
  
    return
  }

}
