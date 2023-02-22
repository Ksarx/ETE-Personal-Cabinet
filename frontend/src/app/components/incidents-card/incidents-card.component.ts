import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IIncident as IIncident } from 'src/app/models/incidents';
Chart.register(...registerables);

@Component({
  selector: 'app-incidents-card',
  templateUrl: './incidents-card.component.html',
  styleUrls: ['./incidents-card.component.scss'],
})
export class IncidentCardComponent implements OnInit {
  @Input() incidents: IIncident[];
  chart: any;
  createChart() {
    this.chart = new Chart('Incidents', {
      type: 'doughnut',

      data: {
        labels: ['Закрытые', 'Активные', 'Новые'],
        datasets: [
          {
            label: 'Количество инцидентов',
            data: [
              this.incidents.filter((item) => item.status === 'closed').length,
              this.incidents.filter((item) => item.status === 'active').length,
              this.incidents.filter((item) => item.status === 'new').length,
            ],
            backgroundColor: ['#24c38e', '#f38b01', '#161a1d'],
            hoverOffset: 4,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
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
