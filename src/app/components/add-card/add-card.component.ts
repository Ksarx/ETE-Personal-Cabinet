import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent {
  constructor(private dialogRef: MatDialog) {}

  @Input() existCards: string[];
  @Output() dialogEvent = new EventEmitter<string>();

  openDialog() {
    const dialog = this.dialogRef.open(AddCardModalComponent, {
      data: this.existCards,
    });
    dialog.afterClosed().subscribe((result: string) => {
      if (result) {
        this.dialogEvent.emit(result);
      }
    });
  }
}
