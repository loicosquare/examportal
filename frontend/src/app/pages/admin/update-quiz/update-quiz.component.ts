import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;
  quiz;
  categories;

  constructor(
    private _route: ActivatedRoute,
    private quizService: QuizService,
    private categorieService: CategoryService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.quizService.getOneQuiz(this.qId).subscribe({
      next: (data) => {
        (this.quiz = data), console.log(this.quiz);
      },
      error: (err: HttpErrorResponse) => console.log(this.quiz),
    });
    this.categorieService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        /*this.router.navigate(['/admin/quizzes']);*/
      },
      error: (err: HttpErrorResponse) => {
        alert('error in loading categories');
      },
    });
  }

  updateQuiz(){
    this.quizService.updateQuiz(this.quiz).subscribe({
      next: (data) => this.snack.open('Quiz updated', 'Done', {duration:3000}),
      error: (err: HttpErrorResponse) => this.snack.open(err.message)
    })
  }
}
