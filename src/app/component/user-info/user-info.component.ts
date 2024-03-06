import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user/user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { Router } from '@angular/router';
@Component({
  selector: 'tr[app-user-info]',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  @Input() user : User;

  constructor(private userService : UserService, private userList : UserListComponent) {}

  deleteUser(item : User) : void{
    this.userList.listUser = this.userList.listUser.filter(u => u !== item)
    this.userService.deleteUser(item.id).subscribe()
  }

  editUser(item : User) {
    return this.userService.editUser(item)
  }
}
