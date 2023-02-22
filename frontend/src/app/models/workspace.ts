import { IEvents_feed } from './events_feed';
import { IIncident } from './incidents';
import { IKpi_indicator } from './kpi_indicator';
import { ILabTest } from './lab_test';
import { IShiftLog } from './shift-log';
import { IUser } from './user';

export interface IWorkspace {
  id: number;
  name: string;
  users: IUser[];
  shift_logs: IShiftLog[];
  events: IEvents_feed[];
  incidents: IIncident[];
  kps: IKpi_indicator[];
  lab_tests: ILabTest[];
}
