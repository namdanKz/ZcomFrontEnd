// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-continue-quiz',
//   templateUrl: './continue-quiz.component.html',
//   styleUrl: './continue-quiz.component.css'
// })
// export class ContinueQuizComponent {

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-continue-quiz',
  templateUrl: './continue-quiz.component.html',
  styleUrls: ['./continue-quiz.component.css']
})
export class ContinueQuizComponent implements OnInit {
  userName: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  continueQuiz(): void {
    this.http.get(`http://localhost:5051/api/quiz/${this.userName}`, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          if(response.body.submit === true)
          {
            console.log("Yeahhhhhhh");
          }
          if (response.status === 200) {
            console.log('User found', response);
            if(response.body.submit === true)
            {
              this.router.navigate(['/summary', this.userName]);
            }
            else
            {
              this.router.navigate(['/quiz', this.userName]);
            }
          } else {
            console.error('User not found', response);
            alert('Not Found This User Name');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('User not found', error);
          alert('Not Found This User Name');
        }
      );
  }
}

