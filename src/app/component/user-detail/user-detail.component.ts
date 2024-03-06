import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})

export class UserDetailComponent {
  user: User
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router : Router
  ) { }

  ngOnInit() {
    this.getUserById()
  }

  getUserById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe(user => this.user = user);
  }

  save() : void {
    if (this.user) {
      console.log(this.user)
      this.userService.updateUser(this.user).subscribe()
      this.router.navigate(['/user'])
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {

  }
}
