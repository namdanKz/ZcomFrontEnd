// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-quiz',
//   templateUrl: './quiz.component.html',
//   styleUrl: './quiz.component.css'
// })
// export class QuizComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient,HttpResponse,HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  userName: string = '';
  questions: any[] = [];
  answers: any[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName')!;
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.http.get<any[]>(`http://localhost:5051/api/quiz/${this.userName}`).subscribe(data => {
      this.questions = data;
      this.loadAnswers();
    });
  }

  loadAnswers(): void {
    this.http.get<any[]>(`http://localhost:5051/api/load/${this.userName}`).subscribe(data => {
      this.answers = data;
      this.applyAnswers();
    });
  }

  // applyAnswers(): void {
  //   this.answers.forEach((answer, index) => {
  //     if (index < this.questions.length) {
  //       const question = this.questions[index];
  //       this.questions[index].selectedAnswerIndex = answer.answerIndex;
  //       this.questions[index].answerId = answer.answerId;
  //     }
  //   });
  // }

  applyAnswers(): void {
    this.answers.forEach(answer => {
      this.questions.forEach(question => {
        question.answers.forEach((option: any, index: number) => {
          if (option.answerId === answer.answerId) {
            question.selectedAnswerIndex = index;
            question.selectedAnswerId = answer.answerId; 
          }
        });
      });
    });
  }

  saveAnswers(): void {
    const selectedAnswers = this.questions
      .filter(question => question.selectedAnswerId !== undefined)
      .map(question => question.selectedAnswerId);

    const payload = {
      userName: this.userName,
      answerId: selectedAnswers
    };

    this.http.post('http://localhost:5051/api/save/', payload).subscribe(
      response => {
        console.log('Save successful', response);
        alert('Save successful');
        // Handle successful save
      },
      error => {
        console.error('Save failed', error);
        // Handle save failure
      }
    );
  }

  saveAnswersThenSubmit(): void {
    const selectedAnswers = this.questions
      .filter(question => question.selectedAnswerId !== undefined)
      .map(question => question.selectedAnswerId);

    const payload = {
      userName: this.userName,
      answerId: selectedAnswers
    };

    this.http.post('http://localhost:5051/api/save/', payload).subscribe(
      response => {
        console.log('Save successful', response);
        this.submitQuiz();
        // Handle successful save
      },
      error => {
        console.error('Save failed', error);
        // Handle save failure
      }
    );
  }

  submitQuiz(): void {
    this.http.get(`http://localhost:5051/api/submit/${this.userName}`, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.error('Submit Success');
          this.router.navigate(['/summary', this.userName]);
        } else {
          console.error('Submit failed', response);
        }
      },
      error => {
        console.error('Submit failed', error);
      }
    );
  }
}
