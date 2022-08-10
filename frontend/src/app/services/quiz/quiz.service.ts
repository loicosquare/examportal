import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  //Get all quizzes
  public getAllQuizzes(){
    return this._http.get(`${baseUrl}/quiz/quizzes`);
  }

  //Add quiz
  public addQuiz(quiz){
    return this._http.post(`${baseUrl}/quiz/add`, quiz);
  }

  //Delete quiz
  public deleteQuiz(qId){
    return this._http.delete(`${baseUrl}/quiz/delete/${qId}`);
  }

  //Get Single Quiz
  public getOneQuiz(qId){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //Update quiz
  public updateQuiz(quiz){
    return this._http.put(`${baseUrl}/quiz/update`, quiz);
  }

  //get Quizzes of category
  public getQuizzesOfCategory(cId){
    return this._http.get(`${baseUrl}/quiz/category/${cId}`);
  }

}
