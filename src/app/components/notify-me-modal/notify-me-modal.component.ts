import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-me-modal',
  templateUrl: './notify-me-modal.component.html',
  styleUrls: ['./notify-me-modal.component.scss'],
})
export class NotifyMeModalComponent {
  time: number;

  constructor(public matDialogRef: MatDialogRef<NotifyMeModalComponent>) {}

  submit() {
    this.matDialogRef.close(this.time);
  }
}
