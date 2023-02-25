import { Component, Input, OnInit } from '@angular/core';
import { IEvents_feed } from 'src/app/models/events_feed';
import { IIncident } from 'src/app/models/incidents';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.scss'],
})
export class EventsCardComponent implements OnInit {
  @Input() workspaceId: number;
  events: IEvents_feed[] = [];
  isChecked = false;

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dto = {
      start: today,
      end: tomorrow,
    };
    this.cardsService
      .getEvents(this.workspaceId.toString(), dto)
      .subscribe((events: IEvents_feed[]) => {
        this.events = events;
      });
  }

  changeEvents(event: any) {
    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    const lastweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    tomorrow.setDate(tomorrow.getDate() + 1);
    yesterday.setDate(today.getDate() - 1);

    if (event.target.checked) {
      const dto = {
        start: lastweek,
        end: tomorrow,
      };
      this.cardsService
        .getEvents(this.workspaceId.toString(), dto)
        .subscribe((events: IEvents_feed[]) => {
          this.events = events;
        });
    } else {
      const dto = {
        start: today,
        end: tomorrow,
      };
      this.cardsService
        .getEvents(this.workspaceId.toString(), dto)
        .subscribe((events: IEvents_feed[]) => {
          this.events = events;
        });
    }
  }
}
