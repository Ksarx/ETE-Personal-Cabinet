import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Chart, registerables } from 'chart.js';
import { IKpi_indicator } from 'src/app/models/kpi_indicator';
import { CardsService } from 'src/app/services/cards.service';
Chart.register(...registerables);

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
})
export class KpiCardComponent implements OnInit {
  @Input() workspaceId: number;
  kps: IKpi_indicator[] = [];
  chart: any;
  @Output() warning = new EventEmitter<string>();
  randId: string;

  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
  });

  constructor(private cardsService: CardsService) {}

  dataChange(event: any) {
    if (this.range.value.start && this.range.value.end) {
      const dto = {
        start: this.range.value.start,
        end: this.range.value.end,
      };
      this.cardsService
        .getKps(this.workspaceId.toString(), dto)
        .subscribe((kps: IKpi_indicator[]) => {
          this.kps = kps;
          this.chart.destroy();
          this.createChart();
        });
    }
  }

  createChart() {
    let values = this.kps.map((k) => {
      if (k.kpi <= 35) {
        this.warning.emit('Предупреждение: Малый показатель КПЭ');
      }
      return k.kpi;
    });
    let dates = this.kps.map((d) => d.date.toString().slice(5, 7));
    this.chart = new Chart('Kpi' + this.randId, {
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
          {
            label: 'Предупреждение',
            data: Array(values.length).fill(35),
            backgroundColor: '#22272B',
            borderColor: '#F38B01',
            borderWidth: 1,
            borderDash: [1, 3],
          },
        ],
      },
      options: {
        responsive: true,
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
    this.randId = Math.floor(Math.random() * 10000).toString();
    if (this.range.value.start && this.range.value.end) {
      const dto = {
        start: this.range.value.start,
        end: this.range.value.end,
      };
      this.cardsService
        .getKps(this.workspaceId.toString(), dto)
        .subscribe((kps: IKpi_indicator[]) => {
          this.kps = kps;
          this.createChart();
        });
    }
  }
}
