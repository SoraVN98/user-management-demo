import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {
  id: number
  user: User
  @Output() addUser = new EventEmitter<User>()

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private userListComponent: UserListComponent,
    private dialogRef: MatDialogRef<UserAddComponent>,
  ) {

  }

  ngOnInit() {
    this.id = Math.max(...this.userService.listUser.map(o => { return o.id })) + 1
    this.user = {
      id: this.id,
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    }
  }

  onSubmit() { }

  add(user: User): void {
    this.addUser.emit(user)
    console.log(user)
    this.toastrService.success('User Added Successfully!', 'Success!', { timeOut: 2000 })
    this.userListComponent.listUser.push(user)
    this.userService.addUser(user).subscribe((user) => {
      this.dialogRef.close()
    })
  }

  goBack() {
    this.dialogRef.close()
  }

}
