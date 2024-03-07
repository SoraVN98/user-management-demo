import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | UrlTree => {
  const authService = inject(AuthService)
  let url : string = state.url
  return authService.checkLogin(url)
};

