import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable, Subject, delay } from 'rxjs';
import { of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean
  authChanged = new BehaviorSubject<boolean>(false)

  constructor(private router: Router) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    this.authChanged = new BehaviorSubject<boolean>(this.isLoggedIn)
  }

  login(username: string, password: string): Observable<any> {
    this.isLoggedIn = username == "admin" && password == "admin"
    localStorage.setItem("isLoggedIn", this.isLoggedIn ? "true" : "false")
    this.authChanged.next(this.isLoggedIn)
    return of(this.isLoggedIn).pipe(
      delay(500),
      tap(val => {
        console.log("Is user authentiaction successful: " + val)
      })
    )
  }
  
  logout() {
    this.isLoggedIn = false
    localStorage.removeItem("isLoggedIn")
    this.authChanged.next(this.isLoggedIn)
  }

  checkLogin(url: string): true | UrlTree {
    let val = localStorage.getItem('isLoggedIn');

    if (val != null && val == "true") {
      if (url == "/login") {
        return this.router.parseUrl('/user');
      }
      else
        return true
    } else {
      if (url == "/login")
        return true
      else
        return this.router.parseUrl('/login')

    }
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn
  }

}
