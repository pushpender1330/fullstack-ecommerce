import { Injectable, signal } from '@angular/core';
import { UserType } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:3000/auth';


  constructor(private http: HttpClient){}


  login({email, password}:{
    email: string,
    password: string
  }){
    return this.http.post<{
      message: string,
      token: string,
      role: string,
      name: string
    }>(`${this.baseUrl}/login`,{
      email,
      password
    })
  }

  signup(user:UserType){
    return this.http.post<{
      message: string
    }>(`${this.baseUrl}/signup`,user);
  }

  logout(){
    localStorage.clear();
    return;
  }



}
