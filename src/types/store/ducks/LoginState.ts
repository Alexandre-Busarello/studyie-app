import { User } from '~/types/entities/User';

export interface LoginState {
  data: User;
  token: string;
  notFound: boolean;
  isLoading: boolean;
  setupCompleted: boolean;
}
