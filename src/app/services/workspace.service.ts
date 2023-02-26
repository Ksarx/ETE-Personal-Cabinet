import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IWorkspace } from '../models/workspace';
import { WorkData } from '../models/work-data';
import { BASE_API_URL } from 'src/common/constants';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private activeCardsSource = new BehaviorSubject<string[]>([]);
  currentActive = this.activeCardsSource.asObservable();

  

  constructor(private http: HttpClient) {}

  getWorkspaceByUserId(id: string): Observable<WorkData> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('user-token')}`
      ),
    };
    return this.http.get<WorkData>(
      BASE_API_URL + '/users/' + id + '/workspace',
      header
    );
  }

  changeActives(cards: string[]) {
    this.activeCardsSource.next(cards);
  }

  addActiveCard(card: string) {
    const currentValue = this.activeCardsSource.value;
    const updatedValue = [...currentValue, card];
    this.activeCardsSource.next(updatedValue);
  }
}
