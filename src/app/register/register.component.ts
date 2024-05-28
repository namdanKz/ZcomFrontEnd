// import { Component, OnInit } from '@angular/core';
// import { UserGroupService } from '../user-group.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   userGroups: any[] = [];

//   constructor(private userGroupService: UserGroupService) { }

//   ngOnInit(): void {
//     this.userGroupService.getUserGroups().subscribe(data => {
//       this.userGroups = data;
//     });
//   }
// }

// import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { UserGroupService } from '../user-group.service';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class RegisterComponent implements OnInit {
//   userGroups: any[] = [];

//   constructor(private userGroupService: UserGroupService, private cdr: ChangeDetectorRef, private router: Router) {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd && event.url === '/register') {
//         this.loadUserGroups();
//       }
//     });
//   }

//   ngOnInit(): void {
//     this.loadUserGroups();
//   }

//   loadUserGroups(): void {
//     this.userGroupService.getUserGroups().subscribe(data => {
//       this.userGroups = data;
//       this.cdr.markForCheck();
//     });
//   }
// }



import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserGroupService } from '../user-group.service';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  userGroups: any[] = [];
  selectedUserGroupId: number = 0;
  userName: string = '';

  constructor(
    private userGroupService: UserGroupService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/register') {
        this.loadUserGroups();
      }
    });
  }

  ngOnInit(): void {
    this.loadUserGroups();
  }

  loadUserGroups(): void {
    this.userGroupService.getUserGroups().subscribe(data => {
      this.userGroups = data;
      this.cdr.markForCheck();
    });
  }

  register(): void {
    const payload = {
      userGroupId: this.selectedUserGroupId,
      userName: this.userName
    };

    this.http.post('http://localhost:5051/api/register', payload, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            console.log('Registration successful', response);
            this.router.navigate(['/quiz', this.userName]);
            // Handle successful registration, e.g., navigate to another page
          } else {
            console.error('Registration failed', response);
            alert('This user name already created');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Registration failed', error);
          alert('This user name already created');
        }
      );

  }
}
