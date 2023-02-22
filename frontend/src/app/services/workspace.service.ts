import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';
import { IWorkspace } from '../models/workspace';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}

  getWorkspaceByUserId(id: string): Observable<IWorkspace> {
    return this.http.get<IWorkspace>('api/users/' + id + '/workspace');
  }
}
