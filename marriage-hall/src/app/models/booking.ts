import { Hall } from './hall';
import { User } from './user';

export interface Booking {
  id?: number;
  userName: string;
  date: string;
  status: string;
  hall: Hall;
  user: User;
}