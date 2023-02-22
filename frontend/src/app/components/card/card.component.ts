import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IUserCard } from 'src/app/models/user-card';
Chart.register(...registerables);

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: IUserCard;
}
