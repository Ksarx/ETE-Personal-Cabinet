import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IIncident as IIncident } from 'src/app/models/incidents';
import { CardsService } from 'src/app/services/cards.service';
Chart.register(...registerables);

@Component({
  selector: 'app-incidents-card',
  templateUrl: './incidents-card.component.html',
  styleUrls: ['./incidents-card.component.scss'],
})
export class IncidentCardComponent implements OnInit {
  constructor(private cardsService: CardsService) {}
  @Input() workspaceId: number;
  incidents: IIncident[] = [];
  chart: any;
  mode = 'day';

  changeDay(event: any) {
    const today = new Date();
    const tomorrow = new Date(today);
    const dto = {
      start: today,
      end: tomorrow,
    };
    this.cardsService
      .getIncidents(this.workspaceId.toString(), dto)
      .subscribe((incidents: IIncident[]) => {
        this.incidents = incidents;
      });
    this.mode = 'day';
    this.chart.destroy();
    this.createChart();
  }
  changeWeek(event: any) {
    const today = new Date();
    const tomorrow = new Date(today);
    const lastweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dto = {
      start: lastweek,
      end: tomorrow,
    };
    this.cardsService
      .getIncidents(this.workspaceId.toString(), dto)
      .subscribe((incidents: IIncident[]) => {
        this.incidents = incidents;
      });
    this.mode = 'week';
    this.chart.destroy();
    this.createChart();
  }
  changeMonth(event: any) {
    const today = new Date();
    const tomorrow = new Date(today);
    const lastmonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dto = {
      start: lastmonth,
      end: tomorrow,
    };
    this.cardsService
      .getIncidents(this.workspaceId.toString(), dto)
      .subscribe((incidents: IIncident[]) => {
        this.incidents = incidents;
      });
    this.mode = 'month';
    this.chart.destroy();
    this.createChart();
  }

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dto = {
      start: today,
      end: tomorrow,
    };
    this.cardsService
      .getIncidents(this.workspaceId.toString(), dto)
      .subscribe((incidents: IIncident[]) => {
        this.incidents = incidents;
        this.createChart();
      });
  }

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
}
