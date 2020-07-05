import { Lesson } from '~/types/entities/Lesson';
import { ContentType } from '~/types/entities/ContentType';

export interface StudentState {
  lessons: Lesson;
  preferences: Array<ContentType>;
  isLoading: boolean;
  errorOnLoading: boolean;
  query: string;
}
