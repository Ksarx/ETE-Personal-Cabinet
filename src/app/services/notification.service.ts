import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifiesDataSource = new BehaviorSubject<string[]>([]);
  currentData = this.notifiesDataSource.asObservable();

  constructor() {}

  changeNotifies(messages: string[]) {
    this.notifiesDataSource.next(messages);
  }

  addNotify(message: string) {
    const currentValue = this.notifiesDataSource.value;
    const updatedValue = [...currentValue, message];
    this.notifiesDataSource.next(updatedValue);
  }

  notifyMeAfter(time: number) {
    setTimeout(() => this.addNotify('Напоминаю!'), time * 1000);
  }
}
