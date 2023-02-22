import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IKpi_indicator } from 'src/app/models/kpi_indicator';
Chart.register(...registerables);

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
})
export class KpiCardComponent implements OnInit {
  @Input() kps: IKpi_indicator[];
  chart: any;

  createChart() {
    let values = this.kps.map((k) => k.kpi);
    let dates = this.kps.map((d) => d.createdAt.slice(5, 7));
    this.chart = new Chart('Kpi', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Количество инцидентов',
            data: values,
            backgroundColor: '#22272B',
            borderColor: '#90DDFF',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            grid: {
              color: '#ffffff33',
            },
            beginAtZero: true,
            ticks: {
              display: false,
            },
          },
          x: {
            grid: {
              color: '#ffffff33',
            },
            ticks: {
              color: '#FAFAFA',
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
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
