import { IWorkspace } from './workspace';

export interface IIncident {
  id: number;
  createdAt: string;
  status: string;
  workspace: IWorkspace;
}
