import { IWorkspace } from './workspace';

export interface IEvents_feed {
  id: number;
  description: string;
  where: string;
  createdAt: string;
  workspace: IWorkspace;
}
