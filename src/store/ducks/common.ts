import { ReduxAction } from '~/types/store/ReduxAction';
import { CommonState } from '~/types/store/ducks/CommonState';

// Actions
export enum ActionType {
  TOGGLE_LOADING = '@common/TOGGLE_LOADING',
}

// Reducer
const initialState: CommonState = {
  isLoading: false,
};

export default function reducer(state = initialState, action?: ReduxAction) {
  switch (action?.type) {
    case ActionType.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const toggleLoading = (isLoading: boolean): ReduxAction => {
  return {
    type: ActionType.TOGGLE_LOADING,
    payload: isLoading,
  };
};

// Thunks
