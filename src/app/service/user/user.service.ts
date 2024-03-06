import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../../model/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  listUser: User[] = []
  apiUrl = 'api/users'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) { }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

  searchHeroes(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.apiUrl}/?name=${term}`)
  }

  editUser(user: User) {
    this.router.navigate([`/user/${user.id}`])
  }

  addUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}`, user, this.httpOptions)
  }

  updateUser(user: User) {
    return this.http.put<User>(this.apiUrl, user, this.httpOptions)
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.apiUrl}/${id}`, this.httpOptions)
  }

}

