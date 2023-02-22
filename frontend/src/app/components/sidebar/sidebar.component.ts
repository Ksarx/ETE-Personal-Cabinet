import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  users: IUser[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAll().subscribe((users: IUser[]) => {
      this.users = users;
    });
  }
}
