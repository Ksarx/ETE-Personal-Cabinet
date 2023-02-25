import { IUser } from './user';

export interface IUserCard {
  id: number;
  title: string;
  value: string;
  updatedAt: Date;
  isNotify: boolean;
  user: IUser;
}
