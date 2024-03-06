import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserAddComponent } from './component/user-add/user-add.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';

const routes: Routes = [
  { path: 'add', component: UserAddComponent },
  { path: 'user', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
