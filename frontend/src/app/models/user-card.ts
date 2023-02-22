import { IUser } from './user';

export interface IUserCard {
  id: number;
  title: string;
  value: string;
  updatedAt: string;
  isNotify: boolean;
  user: IUser;
}
