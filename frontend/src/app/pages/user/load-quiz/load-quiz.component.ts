import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId;
  quizzes;

  constructor(private _route : ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.catId = this._route.snapshot.params['catId'];
    this._route.params.subscribe((params) => {
      this.catId = this._route.snapshot.params['catId'];
      if (this.catId == 0) {
        this.quizService.getAllQuizzes().subscribe({
          next: (data) => this.quizzes = data,
          error: (err) => alert(err.message)
        })
      } else {
        this.quizService.getQuizzesOfCategory(this.catId).subscribe({
          next: (data)=>{
            this.quizzes = data
          },
          error: (err:HttpErrorResponse) => alert(err.message)
        })
      }
    });
  }

}
