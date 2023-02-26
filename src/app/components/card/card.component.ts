import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { IUserCard } from 'src/app/models/user-card';
import { NotificationService } from 'src/app/services/notification.service';
import { NotifyMeModalComponent } from '../notify-me-modal/notify-me-modal.component';
Chart.register(...registerables);

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: IUserCard;
  degStyle: string;

  constructor(
    private dialogRef: MatDialog,
    private notifService: NotificationService
  ) {}

  calcChart() {
    if (this.card.value.includes('/')) {
      let vals: any = this.card.value.split('/');
      let degree = Math.round(
        (parseFloat(((100 * vals[0]) / vals[1]).toFixed(1)) / 100) * 360
      );
      if (this.card.isNotify) {
        this.degStyle = `conic-gradient(#f2c94c ${degree}deg, #161a1d 0deg)`;
      } else {
        this.degStyle = `conic-gradient(#24c38e ${degree}deg, #161a1d 0deg)`;
      }
    } else {
      let vals: any = this.card.value.split('%');
      let degree = ((vals[0] / 100) * 360).toFixed(0);
      if (this.card.isNotify) {
        this.degStyle = `conic-gradient(#f2c94c ${degree}deg, #161a1d 0deg)`;
      } else {
        this.degStyle = `conic-gradient(#24c38e ${degree}deg, #161a1d 0deg)`;
      }
    }
  }

  ngOnInit() {
    this.calcChart();
  }

  openDialog() {
    const dialog = this.dialogRef.open(NotifyMeModalComponent);
    dialog.afterClosed().subscribe((data: number) => {
      if (data) {
        this.notifService.notifyMeAfter(data);
      }
    });
  }
}
