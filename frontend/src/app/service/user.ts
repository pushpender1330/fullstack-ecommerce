import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserType2 } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class User {
  baseUrl = 'http://localhost:3000/auth'

  http = inject(HttpClient)

  getAllUsers(){
    return this.http.get<UserType2>(`${this.baseUrl}/users`)
  }

  changeRole(id: string){
    return this.http.patch(`${this.baseUrl}/change-role`,{
      id
    })
  }
}
