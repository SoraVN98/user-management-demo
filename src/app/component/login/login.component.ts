import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username : string
  password : string
  formData : FormGroup

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.formData = new FormGroup({
      username : new FormControl("admin"),
      password : new FormControl("admin")
    })
  }

  onClickSubmit(data : any) {
    this.username = data.username
    this.password = data.password
    this.authService.login(this.username, this.password).subscribe(data => {
        console.log("Is login success: " + data)
        if(data) {
          this.router.navigate(['/user'])
        }
    })
  }
}
