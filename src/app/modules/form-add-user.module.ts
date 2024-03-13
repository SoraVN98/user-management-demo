import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './user-add/user-add.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [UserAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService],
  exports: [UserAddComponent]
})
export class FormAddUserModule { }
