import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'User Management'
  isLoggedIn: boolean
  constructor(private authService: AuthService, private ref: ChangeDetectorRef) { }
  treeData = [
    {
      label: 'Angular Dropdown Tree', src: '', children: [
        {
          label: 'Node 1', src: '' , children: [
            {
              label: 'Node 1.1 ', src: '', children: [
                { label: 'Node 1.1.1', src: '/user/1' },
                { label: 'Node 1.1.2', src: '/user' }
              ]
            },
            { label: 'Node 1.2', src: '/logout' }
          ]
        },
        {
          label: 'Node 2', src: '', children: [
            { label: 'Node 2.1', src: '/user' },
            { label: 'Node 2.2', src: '/user/1' }
          ]
        }
      ]
    },
  ];

  ngOnInit() {
    this.authService.authChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.ref.detectChanges();
    });
  }

}
