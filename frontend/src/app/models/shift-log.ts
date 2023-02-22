import { IWorkspace } from './workspace';

export class IShiftLog {
  id: number;
  shift_date: string;
  employee: string;
  post: string;
  status: string;
  end_date: string;
  workspace: IWorkspace;
}
