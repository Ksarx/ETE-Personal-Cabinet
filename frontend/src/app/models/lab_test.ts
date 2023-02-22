import { IWorkspace } from './workspace';

export interface ILabTest {
  id: number;
  createdAt: string;
  type: string;
  value: number;
  workspace: IWorkspace;
}
