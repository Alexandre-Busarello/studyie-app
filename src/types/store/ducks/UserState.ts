import { User } from '~/types/entities/User';

export interface UserState {
  data: User;
  token: string;
}
