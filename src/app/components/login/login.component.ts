import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: IUser;
  password: string;
  error: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private authService: AuthService,
    private workspaceService: WorkspaceService,
    public matDialogRef: MatDialogRef<LoginComponent>
  ) {
    this.user = data;
  }

  login() {
    this.authService.login(this.user.id, this.password).subscribe(
      (data) => {
        if (data) {
          this.workspaceService.changeActives([]);
          this.matDialogRef.close(this.user.id);
        }
      },
      (err) => (this.error = 'Неправильный пароль')
    );
  }
}
