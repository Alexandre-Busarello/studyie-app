import { combineReducers } from 'redux';
import common from '~/store/ducks/common';
import user from '~/store/ducks/user';

export const reducers = combineReducers({
  common,
  user,
});
