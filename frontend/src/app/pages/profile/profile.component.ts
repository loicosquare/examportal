import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = null;

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    /*this.loginService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err:HttpErrorResponse) => alert(err)
    })*/
  }

}
