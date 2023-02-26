import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss'],
})
export class NotificationsModalComponent {
  messages: string[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    public matDialogRef: MatDialogRef<NotificationsModalComponent>
  ) {
    this.messages = data;
  }
}
