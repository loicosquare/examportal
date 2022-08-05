import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http : HttpClient) { }

  //get Current user which is loggedIn
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //Generate Token
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //Login user: set tokein in localStorage
  public loginUser(token : string) : Boolean{
    localStorage.setItem('token', token); /*Ca ne donne pas je dois stringify*/
    return true;
  }

  //isLogin : user is logged in or not.
  public isLoggedIn() : boolean{
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //logout: Remove token and user from localStorage
  public logout() : boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken() : any{
    return localStorage.getItem('token'); /*Si ca ne passe pas je dois paser*/
  }

  //set userDetail
  public setUser(user : any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get User
  public getUser(){
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get User role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}
