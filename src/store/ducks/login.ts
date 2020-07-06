import axios from 'axios';
import produce from 'immer';
import { API_URL } from 'react-native-dotenv';
import { User } from '~/types/entities/User';
import { ReduxAction } from '~/types/store/ReduxAction';
import { LoginState } from '~/types/store/ducks/LoginState';
import { addAuthInterceptor } from '~/helpers/axios';

// Actions
export enum ActionType {
  LOGIN = '@login/LOGIN',
  LOGOUT = '@login/LOGOUT',
  LOGIN_NOT_FOUND = '@login/LOGIN_NOT_FOUND',
  START_LOADING = '@login/START_LOADING',
  SETUP_COMPLETED = '@login/SETUP_COMPLETED',
  USER_CREATED = '@login/USER_CREATED',
  RESET_USER_CREATED = '@login/RESET_USER_CREATED',
  REQUEST_ERROR = '@login/REQUEST_ERROR',
  REHYDRATE = 'persist/REHYDRATE',
}

// Reducer
const initialState: LoginState = {
  data: null,
  token: null,
  notFound: false,
  isLoading: false,
  setupCompleted: false,
  userCreated: false,
  errorMessage: '',
};

export default function reducer(state = initialState, action?: ReduxAction) {
  return produce(state, draft => {
    switch (action?.type) {
      case ActionType.LOGIN:
        const { data, token } = action.payload
        draft.data = data;
        draft.token = token;
        draft.isLoading = false;
        break;
      case ActionType.LOGOUT:
        draft.data = null;
        draft.token = null;
        draft.notFound = false;
        draft.isLoading = false;
        draft.setupCompleted = false;
        draft.userCreated = false;
        break;
      case ActionType.LOGIN_NOT_FOUND:
        draft.notFound = true;
        draft.isLoading = false;
        break;
      case ActionType.START_LOADING:
        draft.isLoading = true;
        break;
      case ActionType.SETUP_COMPLETED:
        draft.setupCompleted = true;
        break;
      case ActionType.USER_CREATED:
        draft.userCreated = true;
        draft.isLoading = false;
        draft.errorMessage = '';
        break;
      case ActionType.RESET_USER_CREATED:
        draft.userCreated = false;
        break;
      case ActionType.REQUEST_ERROR:
        const { error } = action.payload
        draft.isLoading = false;
        draft.errorMessage = error;
        break;
      case ActionType.REHYDRATE:
        draft.notFound = false;
        draft.isLoading = false;
        draft.errorMessage = '';
        break;
      default:
    }
  });
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

export const setupCompleted = (): ReduxAction => {
  return {
    type: ActionType.SETUP_COMPLETED,
  };
};

export const userCreated = (): ReduxAction => {
  return {
    type: ActionType.USER_CREATED,
  };
};

export const resetUserCreated = (): ReduxAction => {
  return {
    type: ActionType.RESET_USER_CREATED,
  };
};

export const errorOcurred = (error: string): ReduxAction => {
  return {
    type: ActionType.REQUEST_ERROR,
    payload: {
      error
    },
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
    const response = await axios.post(`${API_URL}/login/signin`, data);

    const { user, token } = response.data;

    addAuthInterceptor(token);

    dispatch(login(user, token));
  } catch (e) {
    dispatch(notFound());
    return;
  }
};

export const signUp = (name: string, email: string, password: string) => async (dispatch) => {
  const data = {
    name,
    email,
    password
  };

  dispatch(startLoading());

  try {
    const response = await axios.post(`${API_URL}/login/signup`, data);
    dispatch(userCreated());
  } catch (e) {
    dispatch(errorOcurred(e.response?.data?.message));
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

  const response = await axios.post(`${API_URL}/login/google/signin`, data);

  const { user, token } = response.data;

  addAuthInterceptor(token);

  dispatch(login(user, token));
};
