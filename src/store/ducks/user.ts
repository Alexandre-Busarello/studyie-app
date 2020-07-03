import axios from 'axios';
import { User } from '~/types/entities/User';
import { ReduxAction } from '~/types/store/ReduxAction';
import { API_URL } from 'react-native-dotenv';
import { UserState } from '~/types/store/ducks/UserState';

// Actions
export enum ActionType {
  LOGIN = '@user/LOGIN',
  LOGOUT = '@user/LOGOUT',
  LOGIN_NOT_FOUND = '@user/LOGIN_NOT_FOUND',
  START_LOADING = '@user/START_LOADING',
  REHYDRATE = 'persist/REHYDRATE',
}

// Reducer
const initialState: UserState = {
  data: null,
  token: null,
  notFound: false,
  isLoading: false,
};

export default function reducer(state = initialState, action?: ReduxAction) {
  switch (action?.type) {
    case ActionType.LOGIN:
      return { ...action.payload, isLoading: false };
    case ActionType.LOGOUT:
      return initialState;
    case ActionType.LOGIN_NOT_FOUND:
      return { ...initialState, notFound: true, isLoading: false };
    case ActionType.START_LOADING:
      return { ...initialState, isLoading: true };
    case ActionType.REHYDRATE:
      return initialState;
    default:
      return state;
  }
}

// Action Creators
export const login = (user: User, token: string): ReduxAction => {
  return {
    type: ActionType.LOGIN,
    payload: {
      data: user,
      token,
    },
  };
};

export const logout = (): ReduxAction => {
  return {
    type: ActionType.LOGOUT,
  };
};

export const notFound = (): ReduxAction => {
  return {
    type: ActionType.LOGIN_NOT_FOUND,
  };
};

export const startLoading = (): ReduxAction => {
  return {
    type: ActionType.START_LOADING,
  };
};

// Thunks
export const signIn = (email: string, password: string) => async (dispatch) => {
  const data = {
    email,
    password
  };

  dispatch(startLoading());

  try {
    const response = await axios.post(`${API_URL}/authentication/signin`, data);

    const { user, token } = response.data;
    dispatch(login(user, token));
  } catch (e) {
    dispatch(notFound());
    return;
  }
};

export const signInFromGoogle = (googleUser: User) => async (dispatch) => {
  const data = {
    externalId: googleUser.id,
    email: googleUser.email,
    firstName: googleUser.firstName,
    lastName: googleUser.lastName,
    pictureUrl: googleUser.pictureUrl
  };

  dispatch(startLoading());

  const response = await axios.post(`${API_URL}/authentication/google/signin`, data);

  const { user, token } = response.data;
  dispatch(login(user, token));
};
