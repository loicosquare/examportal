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
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;

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
        this.loadedQuestions = data,
        this.loadedQuestions.forEach(q => {
          q['givenAnswer'] = ''; //J'ajoute un champ pour chaque question de l'objet qui contiendra la réponse choisie par le user.
        });
      },
      error: (err: HttpErrorResponse) => Swal.fire('Error', err.message)
    })
  }

  submitQuiz(){
    
    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadedQuestions.forEach(q => {

          this.isSubmit = !this.isSubmit;

          if(q.givenAnswer == q.answer){
            this.correctAnswers++;
            let marksSingle = this.loadedQuestions[0].quiz.maxMarks / this.loadedQuestions.length;
            this.marksGot += marksSingle;
          }

          if(q.givenAnswer.trim() != ''){
            this.attempted++;
          }
        });
      } else {
        return;
      }
    })
  }

}
