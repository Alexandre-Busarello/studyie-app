import React, { useState } from 'react';
import {
  Wrapper,
  Input,
  SearchIcon,
} from '~/components/SearchInput/SearchInput.styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadStudentLessons } from '~/store/ducks/student';
import { ReduxState } from '~/types/store/ReduxState';

export const SearchInput = () => {
  const dispatch = useDispatch();
  const lastQuery = useSelector((state: ReduxState) => state.student.query);
  const [text, setText] = useState(lastQuery);

  const isDisabled = !lastQuery && !text;

  const handleSearch = async () => {
    if (isDisabled) {
      return;
    }

    await dispatch(loadStudentLessons(text));
  };

  return (
    <Wrapper>
      <Input
        placeholder="Search in all platform"
        value={text}
        onChangeText={(newValue: string) => setText(newValue)}
        onSubmitEditing={handleSearch}
      />
      <SearchIcon disabled={isDisabled} onPress={handleSearch} />
    </Wrapper>
  );
};
