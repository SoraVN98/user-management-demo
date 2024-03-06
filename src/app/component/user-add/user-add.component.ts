import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {
  id : number 
  user: User 

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.id = Math.max(...this.userService.listUser.map(o => {return o.id})) + 1
    this.user = {
      id : this.id,
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
    this.userService.addUser(user).subscribe(() => this.goBack())
  }

  goBack() {
    this.router.navigate(['/user'])
  }
}
