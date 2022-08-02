import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack:MatSnackBar) {}

  public user: any = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  public registerUser(): void {
    if (this.user.username == '' || this.user.username == null ) {
      this.snack.open('Username is required', 'Ok', {
        duration: 3000,
      });
      return;
    }
    this.userService.addUser(this.user).subscribe({
      next: (response: any) => {
        console.log(response)
        Swal.fire('Successfully done', 'User '+response.username + ' has id'+ response.id, 'success')
      },
      error: (err) => this.snack.open(err.message, '', {
        duration: 2000
      }),
      complete: () => this.snack.open("Crée avec succès", 'Ok', {
        duration: 2000
      }),
    });
  }
}
