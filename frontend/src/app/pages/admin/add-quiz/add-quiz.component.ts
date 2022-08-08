import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories: any = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cId: '',
    },
  };

  constructor(private categorySerbice: CategoryService, private snack: MatSnackBar, private quizService: QuizService) {}

  ngOnInit(): void {
    this.categorySerbice.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err: HttpErrorResponse) => alert(err.message),
    });
  }

  addQuiz(){
    if(this.quizData.title.trim() == '' || this.quizData.title == null){
      this.snack.open('Title is required', 'Got it', {
        duration: 3000,
      })
      return;
    }
    this.quizService.addQuiz(this.quizData).subscribe({
      next: (response) => {
        this.snack.open('Success, quiz is added', 'Done', { duration: 3000 }),
        this.resetQuizForm();
      },
      error: (err: HttpErrorResponse) => this.snack.open(err.message)
    })
  }

  resetQuizForm(){
    this.quizData = {
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: true,
      category: {
        cId: '',
      },
    };
  }
}
