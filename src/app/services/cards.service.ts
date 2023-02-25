import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BASE_API_URL } from 'src/common/constants';
import { DatesDto, LabDto } from '../models/dates';
import { IEvents_feed } from '../models/events_feed';
import { IIncident } from '../models/incidents';
import { IKpi_indicator } from '../models/kpi_indicator';
import { ILabTest } from '../models/lab_test';
import { IUserCard } from '../models/user-card';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  getUserCards(id: string, dto: DatesDto): Observable<IUserCard[]> {
    return this.http
      .post<IUserCard[]>(BASE_API_URL + '/users/' + id + '/user-cards', dto)
      .pipe(
        map((cards: IUserCard[]) => cards),
        catchError((err) => throwError(err))
      );
  }

  getIncidents(id: string, dto: DatesDto): Observable<IIncident[]> {
    return this.http
      .post<IIncident[]>(BASE_API_URL + '/workspace/' + id + '/incidents', dto)
      .pipe(
        map((cards: IIncident[]) => cards),
        catchError((err) => throwError(err))
      );
  }

  getEvents(id: string, dto: DatesDto): Observable<IEvents_feed[]> {
    return this.http
      .post<IEvents_feed[]>(BASE_API_URL + '/workspace/' + id + '/events', dto)
      .pipe(
        map((cards: IEvents_feed[]) => cards),
        catchError((err) => throwError(err))
      );
  }

  getTests(id: string, dto: LabDto): Observable<ILabTest[]> {
    return this.http
      .post<ILabTest[]>(BASE_API_URL + '/workspace/' + id + '/lab-tests', dto)
      .pipe(
        map((cards: ILabTest[]) => cards),
        catchError((err) => throwError(err))
      );
  }

  getKps(id: string, dto: DatesDto): Observable<IKpi_indicator[]> {
    return this.http
      .post<IKpi_indicator[]>(BASE_API_URL + '/workspace/' + id + '/kps', dto)
      .pipe(
        map((cards: IKpi_indicator[]) => cards),
        catchError((err) => throwError(err))
      );
  }
}
