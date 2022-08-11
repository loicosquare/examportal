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
  /*ma modification;*/
  title = '';
  description = '';
  numberOfQuestions;
  maxMarks;

  constructor(private _route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this.quizService.getOneQuiz(this.qid).subscribe({
      next: (data : any) => {
        this.quiz = data,
        this.title = this.quiz['title'],
        this.description = this.quiz['description'],
        this.numberOfQuestions = this.quiz['numberOfQuestions'],
        this.maxMarks = this.quiz['maxMarks'],
        console.log("quiz", this.title , this.description)
      },
      error: (err:HttpErrorResponse) => alert(err.message)
    })
  }

}
