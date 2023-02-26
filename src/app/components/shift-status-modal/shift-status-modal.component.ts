import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shift-status-modal',
  templateUrl: './shift-status-modal.component.html',
  styleUrls: ['./shift-status-modal.component.scss'],
})
export class ShiftStatusModalComponent {
  status: string;

  constructor(public matDialogRef: MatDialogRef<ShiftStatusModalComponent>) {}

  submit() {
    this.matDialogRef.close(this.status);
  }
}
