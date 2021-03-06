import axios from 'axios';
import produce from 'immer';
import { API_URL } from 'react-native-dotenv';
import { Lesson } from '~/types/entities/Lesson';
import { ContentType, UserPreferences } from '~/types/entities/ContentType';
import { ReduxAction } from '~/types/store/ReduxAction';
import { StudentState } from '~/types/store/ducks/StudentState';
import { setupCompleted } from '~/store/ducks/login';

// Actions
export enum ActionType {
  LOAD_LESSONS = '@student/LOAD',
  START_LOADING = '@student/START_LOADING',
  ERROR_ON_LOADING = '@student/ERROR_ON_LOADING',
  CREATE_STUDENT_PREFERENCES = '@student/CREATE_STUDENT_PREFERENCES',
  CLEAR_STUDENT_PREFERENCES = '@student/CLEAR_STUDENT_PREFERENCES',
  SAVE_QUERY = '@student/SAVE_QUERY',
  LOGOUT = '@login/LOGOUT',
}

// Reducer
const initialState: StudentState = {
  lessons: null,
  preferences: null,
  isLoading: false,
  errorOnLoading: false,
  query: '',
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
        draft.isLoading = false;
        break;
      case ActionType.CLEAR_STUDENT_PREFERENCES:
        draft.preferences = null;
        break;
      case ActionType.SAVE_QUERY:
        const { query } = action.payload;
        draft.query = query;
        break;
      case ActionType.LOGOUT:
        draft.lessons = null;
        draft.preferences = null;
        draft.isLoading = false;
        draft.errorOnLoading = false;
        draft.query = '';
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

export const saveStudentPreferences = (preferences: Array<ContentType>): ReduxAction => {
  return {
    type: ActionType.CREATE_STUDENT_PREFERENCES,
    payload: {
      preferences,
    },
  };
};

export const clearStudentPreferences = (): ReduxAction => {
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
export const loadStudentLessons = (query?: string) => async (dispatch) => {
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

export const createStudentPreferences = (selectedContents: Array<ContentType>) => async (dispatch) => {
  dispatch(startLoading());

  const data = selectedContents.map((name, index) => {
    return {
      preferenceName: name,
      priority: index,
    }
  });

  try {
    const response = await axios.post(`${API_URL}/student/preferences`, data);

    const { preferences }: UserPreferences = response.data;

    dispatch(saveStudentPreferences(preferences));
    dispatch(setupCompleted());
  } catch (e) {
    dispatch(errorOnLoading());
    return;
  }
};

export const getStudentPreferences = () => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.get(`${API_URL}/student/preferences`);

    if (!response.data) {
      dispatch(saveStudentPreferences(null));
      return;
    }

    const { preferences }: UserPreferences = response.data;

    dispatch(saveStudentPreferences(preferences));
  } catch (e) {
    dispatch(errorOnLoading());
    return;
  }
};

