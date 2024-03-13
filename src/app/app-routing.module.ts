import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserAddComponent } from './modules/user-add/user-add.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { userGuard } from './guard/user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [userGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'add', component: UserAddComponent, canActivate: [userGuard] },
  { path: 'user', component: UserListComponent, canActivate: [userGuard] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [userGuard] },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
