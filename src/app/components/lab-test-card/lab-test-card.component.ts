import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ILabTest } from 'src/app/models/lab_test';
import { CardsService } from 'src/app/services/cards.service';
import { MatSelectModule } from '@angular/material/select';

Chart.register(...registerables);

@Component({
  selector: 'app-lab-test-card',
  templateUrl: './lab-test-card.component.html',
  styleUrls: ['./lab-test-card.component.scss'],
})
export class LabTestCardComponent implements OnInit {
  @Input() workspaceId: number;
  lab_tests: ILabTest[] = [];
  chart: any;
  selected = 'option1';
  @Output() warning = new EventEmitter<string>();
  randId: string;

  constructor(private cardsService: CardsService) {}

  createChart() {
    let values = this.lab_tests.map((k) => {
      if (k.value >= 90) {
        this.warning.emit('Опасность: Превышены показатели лаб. анализов');
      } else if (k.value <= 60) {
        this.warning.emit(
          'Предупреждение: Пониженные показатели лаб. анализов'
        );
      }
      return k.value;
    });
    let dates = this.lab_tests.map((d) => d.date.toString().slice(5, 7));
    this.chart = new Chart('Lab' + this.randId, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Опасность',
            data: Array(values.length).fill(90),
            backgroundColor: '#22272B',
            borderColor: '#f73b3b',
            borderWidth: 2,
            borderDash: [1, 3],
            type: 'line',
          },
          {
            label: 'Предупреждение',
            data: Array(values.length).fill(60),
            backgroundColor: '#22272B',
            borderColor: '#F38B01',
            borderWidth: 2,
            borderDash: [1, 3],
            type: 'line',
          },
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
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          y: {
            suggestedMax: 100,
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
    this.randId = Math.floor(Math.random() * 10000).toString();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const fiveMonths = new Date(
      today.getFullYear(),
      today.getMonth() - 5,
      today.getDate()
    );

    const dto = {
      start: fiveMonths,
      end: tomorrow,
      type: 'Расход',
    };

    this.cardsService
      .getTests(this.workspaceId.toString(), dto)
      .subscribe((tests: ILabTest[]) => {
        this.lab_tests = tests;
        this.createChart();
      });
  }

  changeTests(event: any) {
    if (this.selected === 'option2') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const fiveMonths = new Date(
        today.getFullYear(),
        today.getMonth() - 5,
        today.getDate()
      );

      const dto = {
        start: fiveMonths,
        end: tomorrow,
        type: 'Восход',
      };
      this.cardsService
        .getTests(this.workspaceId.toString(), dto)
        .subscribe((tests: ILabTest[]) => {
          this.lab_tests = tests;
          this.chart.destroy();
          this.createChart();
        });
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const fiveMonths = new Date(
        today.getFullYear(),
        today.getMonth() - 5,
        today.getDate()
      );

      const dto = {
        start: fiveMonths,
        end: tomorrow,
        type: 'Расход',
      };
      this.cardsService
        .getTests(this.workspaceId.toString(), dto)
        .subscribe((tests: ILabTest[]) => {
          this.lab_tests = tests;
          this.chart.destroy();
          this.createChart();
        });
    }
  }
}
