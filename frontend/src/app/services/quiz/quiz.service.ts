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

}
