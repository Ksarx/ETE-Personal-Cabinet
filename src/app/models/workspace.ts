import { IShiftLog } from './shift-log';
import { IUser } from './user';

export interface IWorkspace {
  id: number;
  name: string;
  users: IUser[];
  shift_logs: IShiftLog[];
}
