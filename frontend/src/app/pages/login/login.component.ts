import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router : Router) { }

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
        
        //Login...
        this.loginService.loginUser(response);

        this.loginService.getCurrentUser().subscribe({
          next: (user: any) => {
            this.loginService.setUser(user);
            console.log(user);
            //Redirect ADMIN :
            //Redirect USER
            if( this.loginService.getUserRole() == 'ADMIN'){
              //window.location.href = '/admin';
              this.router.navigate(['admin']);
            }else if (this.loginService.getUserRole() == 'NORMAL') {
              //window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard']);
            } else {
              this.loginService.logout();
            }
          }
        });



      },
      error: (err)=> {
        console.log('Error'); console.log(err);
        this.snack.open("User" + this.loginData.username +" is invalid !", 'Ok', {
          duration: 3000
        });
      }
    })
  }

}
