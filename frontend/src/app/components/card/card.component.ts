import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IUserCard } from 'src/app/models/user-card';
Chart.register(...registerables);

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: IUserCard;
  degStyle: string;

  calcChart() {
    if (this.card.value.includes('/')) {
      let vals: any = this.card.value.split('/');
      let degree = Math.round(
        (parseFloat(((100 * vals[0]) / vals[1]).toFixed(1)) / 100) * 360
      );
      this.degStyle = `conic-gradient(#24c38e ${degree}deg, #161a1d 0deg)`;
    } else {
      let vals: any = this.card.value.split('%');
      let degree = ((vals[0] / 100) * 360).toFixed(0);
      this.degStyle = `conic-gradient(#24c38e ${degree}deg, #161a1d 0deg)`;
    }
  }

  ngOnInit() {
    this.calcChart();
  }
}
