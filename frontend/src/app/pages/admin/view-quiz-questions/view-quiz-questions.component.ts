import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions = [];

  constructor(private _route: ActivatedRoute, private questionService : QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.questionService.getOneQuestionOfQuiz(this.qId).subscribe({
      next: (data : any) => {
        this.questions = data,
        console.log('res', this.questions);
      },
      error: (err : HttpErrorResponse) => alert(""+err.message)
    })
  }

}
