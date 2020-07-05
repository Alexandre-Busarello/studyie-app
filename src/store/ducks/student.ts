import axios from 'axios';
import produce from 'immer';
import { API_URL } from 'react-native-dotenv';
import { Lesson } from '~/types/entities/Lesson';
import { ContentType } from '~/types/entities/ContentType';
import { ReduxAction } from '~/types/store/ReduxAction';
import { StundentState } from '~/types/store/ducks/StundentState';
import { setupCompleted } from '~/store/ducks/student';

// Actions
export enum ActionType {
  LOAD_LESSONS = '@student/LOAD',
  START_LOADING = '@student/START_LOADING',
  ERROR_ON_LOADING = '@student/ERROR_ON_LOADING',
  CREATE_STUDENT_PREFERENCES = '@student/CREATE_STUDENT_PREFERENCES',
  CLEAR_STUDENT_PREFERENCES = '@student/CLEAR_STUDENT_PREFERENCES',
  SAVE_QUERY = '@student/SAVE_QUERY',
}

// Reducer
const initialState: StundentState = {
  lessons: null,
  preferences: null,
  isLoading: false,
  errorOnLoading: false,
  query: ''
};

export default function reducer(state = initialState, action?: ReduxAction) {
  return produce(state, draft => {
    switch (action?.type) {
      case ActionType.LOAD_LESSONS:
        const { lessons } = action.payload;
        draft.lessons = lessons;
        draft.isLoading = false;
        break;
      case ActionType.START_LOADING:
        draft.isLoading = true;
        break;
      case ActionType.ERROR_ON_LOADING:
        draft.isLoading = false;
        draft.errorOnLoading = true;
        break;
      case ActionType.CREATE_STUDENT_PREFERENCES:
        const { preferences } = action.payload;
        draft.preferences = preferences;
        break;
      case ActionType.CLEAR_STUDENT_PREFERENCES:
        draft.preferences = null;
        break;
      case ActionType.SAVE_QUERY:
        const { query } = action.payload;
        draft.query = query;
        break;
      default:
    }
  });
}

// Action Creators
export const loadLessons = (lessons: Array<Lesson>): ReduxAction => {
  return {
    type: ActionType.LOAD_LESSONS,
    payload: {
      lessons,
    },
  };
};

export const startLoading = (): ReduxAction => {
  return {
    type: ActionType.START_LOADING,
  };
};

export const errorOnLoading = (): ReduxAction => {
  return {
    type: ActionType.ERROR_ON_LOADING,
  };
};

export const createStudentPreferences = (preferences: Array<ContentType>): ReduxAction => {
  return {
    type: ActionType.CREATE_STUDENT_PREFERENCES,
    payload: {
      preferences,
    },
  };
};

export const clearStudentPreferences = (preferences: Array<ContentType>): ReduxAction => {
  return {
    type: ActionType.CLEAR_STUDENT_PREFERENCES,
  };
};

export const saveQuery = (query: string): ReduxAction => {
  return {
    type: ActionType.SAVE_QUERY,
    payload: {
      query,
    },
  };
};

// Thunks
export const loadStudentLessons = (query: string) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(saveQuery(query));

  const getUrl = query
    ? `${API_URL}/student/lesson?q=${query}`
    : `${API_URL}/student/lesson`;

  try {
    const response = await axios.get(getUrl);

    const lessons: Array<Lesson> = response.data;

    dispatch(loadLessons(lessons));
  } catch (e) {
    dispatch(errorOnLoading());
    return;
  }
};

export const saveStudentPreferences = (selectedContents: Array<ContentType>) => async (dispatch) => {
  dispatch(startLoading());

  const data = selectedContents.map((name, index) => {
    return {
      preferenceName: name,
      priority: index,
    }
  });

  try {
    const response = await axios.post(`${API_URL}/student/preferences`, data);

    const { preferences }: Array<ContentType> = response.data;

    dispatch(createStudentPreferences(preferences));
    dispatch(setupCompleted());
  } catch (e) {
    dispatch(errorOnLoading());
    return;
  }
};
