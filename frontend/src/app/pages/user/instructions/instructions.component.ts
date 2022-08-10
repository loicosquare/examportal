import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid;
  quiz;

  constructor(private _route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this.quizService.getOneQuiz(this.qid).subscribe({
      next: (data) => {
        this.quiz = data
      },
      error: (err:HttpErrorResponse) => alert(err.message)
    })
  }

}
