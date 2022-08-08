import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { NotificationService } from '../../services/notification/notification.service';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes : any = [];

  constructor(private quizService: QuizService, private snack : MatSnackBar, private notifier: NotificationService) { }

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes(){
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data,
        console.log(this.quizzes)
      },
      error: (err: HttpErrorResponse) => this.snack.open(err.message)
    })
  }

  deleteQuiz(qId){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.quizService.deleteQuiz(qId).subscribe({
          next: (data) => {
            (this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId)),
              this.notifier.onError('Quiz supprimé avec succès');
            /*this.getAllQuizzes()*/
          },
          error: (err: HttpErrorResponse) => this.notifier.onInfo(err.message),
        });
      }
    })
  }

}
