import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  //Generate Token
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //Login user: set tokein in localStorage
  public loginUser(token : any) : Boolean{
    localStorage.setItem('token', token);
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

  //mogout: Remove token and user from localStorage
  public logout() : boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken() : any{
    return localStorage.getItem('token');
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
