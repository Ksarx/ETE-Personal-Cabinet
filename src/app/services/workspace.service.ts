import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorkspace } from '../models/workspace';
import { WorkData } from '../models/work-data';
import { BASE_API_URL } from 'src/common/constants';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}

  getWorkspaceByUserId(id: string): Observable<WorkData> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('user-token')}`
      ),
    };
    return this.http.get<WorkData>(
      BASE_API_URL + 'users/' + id + '/workspace',
      header
    );
  }
}
