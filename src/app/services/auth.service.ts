import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { BASE_API_URL } from 'src/common/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(id: number, password: string) {
    return this.http
      .post<any>(BASE_API_URL + '/auth/login', { id, password })
      .pipe(
        map((data) => {
          localStorage.setItem('user-token', data.accessToken);
          return data;
        })
      );
  }
}
