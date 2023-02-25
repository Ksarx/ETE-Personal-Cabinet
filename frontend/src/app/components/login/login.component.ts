import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: IUser;
  password: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = data;
  }

  login() {
    this.authService.login(this.user.id, this.password).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/users', this.user.id]);
      
    });
  }
}
