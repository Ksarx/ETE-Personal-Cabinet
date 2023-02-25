import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserCardModalComponent } from '../add-user-card-modal/add-user-card-modal.component';

@Component({
  selector: 'app-add-user-card',
  templateUrl: './add-user-card.component.html',
  styleUrls: ['./add-user-card.component.scss'],
})
export class AddUserCardComponent {
  constructor(private dialogRef: MatDialog) {}
  @Input() userId: number;

  openDialog() {
    const dialog = this.dialogRef.open(AddUserCardModalComponent, {
      data: this.userId,
    });
  }
}
