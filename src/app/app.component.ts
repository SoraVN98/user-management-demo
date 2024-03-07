import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'User Management'
  isLoggedIn : boolean
  constructor(private authService: AuthService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.authService.authChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn; 
      this.ref.detectChanges(); 
    });
  }

}
