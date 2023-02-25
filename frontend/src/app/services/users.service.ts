import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, map } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>('api/users').pipe(
      map((users: IUser[]) => users),
      catchError((err) => throwError(err))
    );
  }

  getUserById(id: string): Observable<IUser> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('user-token')}`
      ),
    };
    return this.http.get<IUser>('api/users/' + id, header).pipe(
      map((user: IUser) => user),
      catchError((err) => throwError(err))
    );
  }
}
