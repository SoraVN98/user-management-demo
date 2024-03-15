import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { User } from '../../model/user';
import { Subject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  listUser: User[] = [];
  searchTerms = new Subject<string>();
  users$!: Observable<User[]>;
  userSubcription: Subscription | undefined
  @ViewChild('addUserForm') addUserForm: TemplateRef<any>;
  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userSubcription = this.userService.getListUser().subscribe((data: User[]) => {
      this.userService.listUser = data
      this.listUser = data
    })

    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchHeroes(term)),
    );
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit')
  }

  ngOnDestroy(): void {
    if (this.userSubcription) {
      this.userSubcription?.unsubscribe()
    }
  }

  openAddUserForm() {
    const dialogRef = this.dialog.open(this.addUserForm, {
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
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
