import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

  constructor(private toastr: ToastrService){}

  authService = inject(Auth);
  
  private router = inject(Router);

  signupForm = new FormGroup({
    name : new FormControl('',{nonNullable: true, validators: [Validators.required]}),
    address:  new FormControl('',{nonNullable: true,validators: [Validators.required,Validators.minLength(8)]}),
    email: new FormControl('',{nonNullable: true,validators:[Validators.required,Validators.email]}),
    phoneNumber : new FormControl('',{nonNullable: true,validators:[Validators.required,Validators.pattern('\[0-9]+'),Validators.maxLength(10),Validators.minLength(10)]}),
    password: new FormControl('',{nonNullable:true,validators:[Validators.required,Validators.minLength(8)]}),
    confirmPassword: new FormControl('',{nonNullable:true,validators:[Validators.required]})
  })

  signup(){
    if(this.signupForm.invalid){
      this.signupForm.markAllAsTouched();
      return;
    }
    const formValues = this.signupForm.getRawValue();
    if(formValues?.confirmPassword !== formValues?.password){
      this.toastr.success('confirm password must match password');

      return;
    }

    const {confirmPassword ,...payload} = formValues;

    
    this.authService.signup(payload).subscribe({
      next: (resp) => {
        this.toastr.success(resp.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }

    });

    return;
  }
}
