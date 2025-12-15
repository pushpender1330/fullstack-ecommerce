import { Component, signal } from '@angular/core';
import { UserType2 } from '../../models/user';
import { User as UserService } from '../../service/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  usersList = signal<UserType2 | null>(null);

  constructor(private userService: UserService,private toastr: ToastrService){}

  getUsers(){
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.usersList.set(data)
      },
      error: (err)=>{
        this.toastr.error(err?.error?.message)
      }
    })
  }

  changeUserRole(id: string){
    this.userService.changeRole(id).subscribe({
      next:()=>{
        this.getUsers();
      },
      error: (err)=>{
        this.toastr.error(err?.error?.message);
      }
    })
  }

  ngOnInit(){
    this.getUsers();
  }

}
