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
  questions;
  questionsLength;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;

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
      next: (data : any) => {
        this.questions = data,
        this.timer = this.questions.length * 2 * 60;
        this.questionsLength = data.length;

        this.questions.forEach(q => {
          q['givenAnswer'] = ''; //J'ajoute un champ pour chaque question de l'objet qui contiendra la réponse choisie par le user.
        });

        this.startTimer();
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
        this.evalQuiz();
      } else {
        return;
      }
    })
  }

  startTimer(){
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
    this.questions.forEach(q => {

      this.isSubmit = !this.isSubmit;

      if(q.givenAnswer == q.answer){
        this.correctAnswers++;
        let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
        this.marksGot = parseFloat(Number(this.marksGot).toFixed(2)); // I want to stop at two number after the comma.
      }

      if(q.givenAnswer.trim() != ''){
        this.attempted++;
      }
    });
  }

  printPage(){
    window.print();
  }
}
