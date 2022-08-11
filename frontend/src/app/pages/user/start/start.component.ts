import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question/question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid;
  loadedQuestions;

  constructor(private locationStrategy: LocationStrategy, private _route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.preventBackButton();
    this.loadQuestions();
  }

  //Pour que quand on est sur la page start qu'on ne puisse pas rentrer à l'aide des buttons du navigateur.
  preventBackButton(){
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  loadQuestions(){
    this.questionService.getOneQuestionOfQuizForTest(this.qid).subscribe({
      next: (data) => {
        this.loadedQuestions = data
      },
      error: (err: HttpErrorResponse) => Swal.fire('Error', err.message)
    })
  }

}
