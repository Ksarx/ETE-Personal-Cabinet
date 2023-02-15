import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-analytic-card',
  templateUrl: './analytic-card.component.html',
  styleUrls: ['./analytic-card.component.scss'],
})
export class AnalyticCardComponent implements OnInit {
  chart: any;
  number = 24;
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut',

      data: {
        labels: ['Закрытые', 'Активные', 'Новые'],
        datasets: [
          {
            label: 'Количество инцидентов',
            data: [12, 6, 6],
            backgroundColor: ['#24c38e', '#f38b01', '#161a1d'],
            hoverOffset: 4,
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: 80,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  ngOnInit(): void {
    this.createChart();
  }
}
