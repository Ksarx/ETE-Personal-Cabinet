import { IUserCard } from './user-card';
import { IWorkspace } from './workspace';

export interface IUser {
  id: number;
  name: string;
  patronymic: string;
  surname: string;
  work: string;
  imageUrl: string;
  workspace: IWorkspace;
  cards: IUserCard[];
}
