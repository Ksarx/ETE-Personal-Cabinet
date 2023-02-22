import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ILabTest } from 'src/app/models/lab_test';
Chart.register(...registerables);

@Component({
  selector: 'app-lab-test-card',
  templateUrl: './lab-test-card.component.html',
  styleUrls: ['./lab-test-card.component.scss'],
})
export class LabTestCardComponent implements OnInit {
  @Input() lab_tests: ILabTest[];
  chart: any;

  createChart() {
    let values = this.lab_tests.map((k) => k.value);
    console.log(values);
    let dates = this.lab_tests.map((d) => d.createdAt.slice(5, 7));
    this.chart = new Chart('Lab', {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Количество инцидентов',
            data: values,
            backgroundColor: '#90DDFF',
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
