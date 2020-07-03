import { UserState } from '~/types/store/ducks/UserState';
import { CommonState } from '~/types/store/ducks/CommonState';

export interface ReduxState {
  common: CommonState;
  user: UserState;
}
