import axios from 'axios';
import produce from 'immer';
import { API_URL } from 'react-native-dotenv';
import { ContentType } from '~/types/entities/ContentType';
import { ReduxAction } from '~/types/store/ReduxAction';
import { DataState } from '~/types/store/ducks/DataState';

// Actions
export enum ActionType {
  LOAD_CONTENT_TYPES = '@data/LOAD_CONTENT_TYPES',
}

// Reducer
const initialState: DataState = {
  contentTypes: null,
};

export default function reducer(state = initialState, action?: ReduxAction) {
  return produce(state, draft => {
    switch (action?.type) {
      case ActionType.LOAD_CONTENT_TYPES:
        const { contentTypes } = action.payload;
        draft.contentTypes = contentTypes;
        break;
      default:
    }
  });
}

// Action Creators
export const loadContentTypes = (contentTypes: Array<ContentType>): ReduxAction => {
  return {
    type: ActionType.LOAD_CONTENT_TYPES,
    payload: {
      contentTypes,
    },
  };
};

// Thunks
export const loadContentTypesData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/data/content/types`);

    const contentTypes: Array<ContentType> = response.data;

    dispatch(loadContentTypes(contentTypes));
  } catch (e) {
    return e;
  }
};
