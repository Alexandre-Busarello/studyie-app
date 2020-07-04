import { combineReducers } from 'redux';
import login from '~/store/ducks/login';
import student from '~/store/ducks/student';
import data from '~/store/ducks/data';

export const reducers = combineReducers({
  login,
  student,
  data,
});
