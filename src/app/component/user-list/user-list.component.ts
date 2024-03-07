import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { User } from '../../model/user';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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

  // Sort
  sortKey: string = '';
  sortDirection: string = 'asc';

  sortTable(key: string) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.listUser.sort((a, b) => {
      const aValue = this.getValue(a, key);
      const bValue = this.getValue(b, key);
      if (key === 'id') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }

  getValue(obj: any, key: string): any {
    if (key === 'address') {
      return obj.address.street;
    } else if (key === 'company.name') {
      return obj.company.name;
    } else {
      return obj[key];
    }
  }

}
