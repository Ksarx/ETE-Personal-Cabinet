import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';

@Component({
  selector: 'app-delete-cards-modal',
  templateUrl: './delete-cards-modal.component.html',
  styleUrls: ['./delete-cards-modal.component.scss'],
})
export class DeleteCardsModalComponent {
  existCards: string[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    public matDialogRef: MatDialogRef<DeleteCardsModalComponent>
  ) {
    this.existCards = data;
  }
  delete_card(data: string) {
    this.matDialogRef.close(data);
  }
}
