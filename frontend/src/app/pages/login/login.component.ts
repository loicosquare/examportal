import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData : any = {
    username: '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public loginUser():void{
    if(this.loginData.username == '' || this.loginData.username == null){
      this.snack.open('Username is required !', 'Ok', {
        duration: 2000
      });
      return;
    }
    if (this.loginData.password == '' || this.loginData.password == null) {
      this.snack.open('Password is required !', 'Ok', {
        duration: 2000,
      });
      return;
    }

    //Request to server to generate Token.
    this.loginService.generateToken(this.loginData).subscribe({
      next: (response : any) => {
        console.log('success'),
        console.log(response);
      },
      error: (err)=> {
        console.log('Error'), console.log(err);
      }
    })
  }

}
