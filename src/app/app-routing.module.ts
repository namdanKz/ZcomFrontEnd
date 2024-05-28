import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { ContinueQuizComponent } from './continue-quiz/continue-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { SummaryComponent } from './summary/summary.component';



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'continue-quiz', component: ContinueQuizComponent },
  { path: 'quiz/:userName', component: QuizComponent },
  { path: 'summary/:userName', component: SummaryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
