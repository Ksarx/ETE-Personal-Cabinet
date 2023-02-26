import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { PostShiftLog } from '../models/post-shift-log';
import { IShiftLog } from '../models/shift-log';
import { ShiftLogStart } from '../models/shift-log-start';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/user';
import { BASE_API_URL } from 'src/common/constants';

@Injectable({
  providedIn: 'root',
})
export class ShiftLogService {
  private shiftLogSource = new BehaviorSubject<ShiftLogStart[]>([]);
  startedShiftLog = this.shiftLogSource.asObservable();

  constructor(private http: HttpClient) {}

  changeShiftLogs(shift: ShiftLogStart[]) {
    this.shiftLogSource.next(shift);
  }

  addShiftLog(user: IUser) {
    const currentValue = this.shiftLogSource.value;
    const startLog: ShiftLogStart = {
      userId: user.id,
      shift_date: new Date(),
      employee:
        user.surname + ' ' + user.name[0] + '.' + user.patronymic[0] + '.',
      post: user.work,
    };

    const updatedValue = [...currentValue, startLog];
    this.shiftLogSource.next(updatedValue);
  }

  endShift(userId: number, workspaceId: number, status: string) {
    const currentValue = this.shiftLogSource.value;
    const currentUser = currentValue.find((o) => o.userId === userId);
    if (currentUser) {
      const dto = {
        shift_date: currentUser?.shift_date,
        employee: currentUser?.employee,
        post: currentUser?.post,
        status: status,
        end_date: new Date(),
      };
      this.postShiftLog(workspaceId, dto).subscribe((data) => {
        const filtered = currentValue.filter((o) => o.userId != userId);
        this.shiftLogSource.next(filtered);
      });
    }
  }

  postShiftLog(workspaceId: number, dto: PostShiftLog): Observable<IShiftLog> {
    return this.http
      .post<IShiftLog>(
        BASE_API_URL + '/workspaces/' + workspaceId + '/shift-logs',
        dto
      )
      .pipe(
        map((data: IShiftLog) => data),
        catchError((err) => throwError(err))
      );
  }
}
