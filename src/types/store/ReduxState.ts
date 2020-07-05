import { LoginState } from '~/types/store/ducks/LoginState';
import { StudentState } from '~/types/store/ducks/StudentState';
import { DataState } from '~/types/store/ducks/DataState';

export interface ReduxState {
  login: LoginState;
  student: StudentState;
  data: DataState;
}
