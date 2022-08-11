import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

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

  constructor(private _route: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this.quizService.getOneQuiz(this.qid).subscribe({
      next: (data : any) => {
        this.quiz = data,
        this.title = this.quiz['title'],
        this.description = this.quiz['description'],
        this.numberOfQuestions = this.quiz['numberOfQuestions'],
        this.maxMarks = this.quiz['maxMarks']
      },
      error: (err:HttpErrorResponse) => alert(err.message)
    })
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        /*this.router.navigateByUrl('/start/'+this.qid);*/ //meme chose
        this.router.navigate(['/start/'+this.qid]);
      } else {
        return;
      }
    })
  }

}
