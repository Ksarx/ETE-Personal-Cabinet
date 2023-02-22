import { IWorkspace } from './workspace';

export interface IKpi_indicator {
  id: number;
  createdAt: string;
  kpi: number;
  workspace: IWorkspace;
}
