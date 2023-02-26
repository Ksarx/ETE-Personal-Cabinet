import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationsModalComponent } from '../notifications-modal/notifications-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  messages: string[] = [];

  constructor(
    private notifService: NotificationService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.notifService.currentData.subscribe((data) => (this.messages = data));
  }

  openDialog() {
    const dialog = this.dialogRef.open(NotificationsModalComponent, {
      data: this.messages,
    });
    dialog.afterClosed().subscribe((result: string) => {
      this.notifService.changeNotifies([]);
    });
  }
}
