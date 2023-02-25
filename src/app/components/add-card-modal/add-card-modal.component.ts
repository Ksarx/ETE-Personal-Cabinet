import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-card-modal',
  templateUrl: './add-card-modal.component.html',
  styleUrls: ['./add-card-modal.component.scss'],
})
export class AddCardModalComponent {
  existCards: string[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    public matDialogRef: MatDialogRef<AddCardModalComponent>
  ) {
    this.existCards = data;
  }
  add_card(data: string) {
    this.matDialogRef.close(data);
  }
}
