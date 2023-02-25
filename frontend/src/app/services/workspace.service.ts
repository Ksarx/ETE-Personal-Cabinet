import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorkspace } from '../models/workspace';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}

  getWorkspaceByUserId(id: string): Observable<IWorkspace> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('user-token')}`
      ),
    };
    return this.http.get<IWorkspace>('api/users/' + id + '/workspace', header);
  }
}
