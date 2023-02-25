import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(id: number, password: string) {
    return this.http.post<any>('api/auth/login', { id, password }).pipe(
      map((data) => {
        localStorage.setItem('user-token', data.accessToken);
        return data;
      })
    );
  }
}
