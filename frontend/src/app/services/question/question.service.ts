import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _httpClient: HttpClient) { }

  //Get one question of quiz
  public getOneQuestionOfQuiz(qId){
    return this._httpClient.get(`${baseUrl}/question/quiz/${qId}`);
  }

  //Add question
  public addQuestion(question){
    return this._httpClient.post(`${baseUrl}/question/add`, question);
  }

  public deleteQuestion(questionId){
    return this._httpClient.delete(`${baseUrl}/question/delete/${questionId}`);
  }

}
