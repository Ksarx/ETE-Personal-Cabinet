import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  users: IUser[] = [];

  constructor(
    private usersService: UsersService,
    private dialogRef: MatDialog,
    private router: Router
  ) {}

  openDialog(user: IUser) {
    const modal = this.dialogRef.open(LoginComponent, {
      data: user,
    });
    modal.afterClosed().subscribe((id: number) => {
      if (id) {
        this.router.navigate(['/users', id]);
      }
    });
  }

  initUsers() {
    this.usersService
      .getAll()
      .pipe(map((users: IUser[]) => (this.users = users)))
      .subscribe();
  }

  ngOnInit(): void {
    this.initUsers();
  }
}
