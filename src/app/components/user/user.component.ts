import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user: IUser;
  isCurrent = false;
  colors = ['#F56B00', '#C62828', '#E92064'];

  getColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
