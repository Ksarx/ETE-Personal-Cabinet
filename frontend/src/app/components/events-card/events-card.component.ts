import { Component, Input, OnInit } from '@angular/core';
import { IEvents_feed } from 'src/app/models/events_feed';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.scss'],
})
export class EventsCardComponent {
  @Input() events: IEvents_feed[];
}
