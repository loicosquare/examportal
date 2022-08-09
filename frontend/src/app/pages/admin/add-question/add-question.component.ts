import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  qId;
  qTitle;
  question = {
    quiz:{

    },
    content: '',
    option1 : '',
    option2: '',
    option3 : '',
    option4: '',
    answer: '',
  };

  constructor(private _route: ActivatedRoute, private questionService: QuestionService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qTitle = this._route.snapshot.params['title'];
    this.qId = this._route.snapshot.params['qid'];
    this.question.quiz['qId'] = this.qId;
  }

  addQuestion(){
    if (this.question.content.trim() == '' || this.question.content == null) {
      this.snack.open('The question content can\'t be empty', 'Try it', {duration: 2000});
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this.snack.open('The question content can\'t be empty', 'Try it', {duration: 2000});
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this.snack.open('The question content can\'t be empty', 'Try it', {duration: 2000});
      return;
    }
    this.questionService.addQuestion(this.question).subscribe({
      next: (data) => {
        this.snack.open('Question added', 'Good', {duration: 2000}),
        this.resetQuestion();
      },
      error: (err: HttpErrorResponse) => this.snack.open(err.message)
    })
    
  }

  resetQuestion(){
    this.question.content = '',
    this.question.option1 = '',
    this.question.option2 = '',
    this.question.option3 = '',
    this.question.option4 =  '',
    this.question.answer = ''
  }

}
