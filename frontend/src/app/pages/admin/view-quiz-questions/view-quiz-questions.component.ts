import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions = [];

  constructor(private _route: ActivatedRoute, private questionService : QuestionService, private snack: MatSnackBar) { }

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

  deleteQuestion(questId){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.questionService.deleteQuestion(questId).subscribe({
          next: (data) => {
            (this.questions = this.questions.filter((quest) => quest.questId != questId)),
              this.snack.open('Question supprimée avec succès', 'Deleted', {duration: 3000});
          },
          error: (err: HttpErrorResponse) => this.snack.open(err.message, 'Eroor', {duration: 2000}),
        });
      }
    })
  }

}
