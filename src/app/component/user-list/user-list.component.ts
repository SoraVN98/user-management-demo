import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { User } from '../../model/user';
import { Subject, Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  listUser: User[] = [];
  searchTerms = new Subject<string>();
  users$!: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getListUser().subscribe((data: User[]) => {
      this.userService.listUser = data
      return this.listUser = data
    })

    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchHeroes(term)),
    );
  }

  search(term: string) {
    this.searchTerms.next(term)
  }
}
