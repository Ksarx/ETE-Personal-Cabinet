import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user-card-modal',
  templateUrl: './add-user-card-modal.component.html',
  styleUrls: ['./add-user-card-modal.component.scss'],
})
export class AddUserCardModalComponent {
  title = '';
  value = '';
  isNotify = false;
  userId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public matDialogRef: MatDialogRef<AddUserCardModalComponent>,
    private userService: UsersService
  ) {
    this.userId = data;
  }

  submit() {
    const dto = {
      title: this.title,
      value: this.value,
      isNotify: this.isNotify,
      updatedAt: new Date(),
    };
    this.userService
      .postUserCard(this.userId.toString(), dto)
      .subscribe((data) => {
        console.log(data);
      });
    this.matDialogRef.close();
  }
}
