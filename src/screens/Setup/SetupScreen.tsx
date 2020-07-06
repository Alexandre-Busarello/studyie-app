import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadContentTypesData } from '~/store/ducks/data';
import { createStudentPreferences, getStudentPreferences } from '~/store/ducks/student';
import { User } from '~/types/entities/User';
import { ContentType } from '~/types/entities/ContentType';
import { StackScreenProps } from '~/types/routes/StackScreenProps';
import { ReduxState } from '~/types/store/ReduxState';

import {
  CurstomKeyboardAwareScrollView,
  Title,
  Description,
  FormInput,
  InputWrapper,
  FormButton,
  BadgeWrapper,
  Badge,
  ConfirmButton,
  AddIcon,
  LoadingWrapper,
  NoConfirmButton
} from './SetupScreen.styles';

interface Props {
  navigation: StackNavigationProp<any>;
  route: {
    params: any;
    lesson: Lesson;
  };
}

export const SetupScreen = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: ReduxState) => state.login.data);
  const contentTypes = useSelector(
    (state: ReduxState) => state.data.contentTypes,
  );
  const preferences: Array<ContentType> = useSelector((state: ReduxState) => state.student.preferences);
  const isLoading: boolean = useSelector((state: ReduxState) => state.student.isLoading);

  const contentTypesStringArray = contentTypes?.map(c => c.name);

  const contentState = useState('');
  const [contentType, setContentType] = contentState;
  const [selectedContents, setSelectedContents] = useState([]);

  useEffect(() => {
    if (!route?.params?.edit) {
      dispatch(getStudentPreferences());
    }
    dispatch(loadContentTypesData());
  }, [dispatch]);

  function handleAddContent() {
    if (!contentType || selectedContents?.length >= 10) {
      return null;
    };
    if (selectedContents.find(c => c === contentType)) {
      return null;
    };
    setSelectedContents([...selectedContents, contentType]);
    setContentType('');
  }

  function handleSubmit() {
    dispatch(createStudentPreferences(selectedContents));
  }

  function handleNoChanges() {
    navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
  }

  const renderLoading = () => {
    return (
      <LoadingWrapper>
        <ActivityIndicator size="large" color="#db4c77" />
      </LoadingWrapper>
    );
  };

  if (isLoading) {
    return renderLoading();
  }

  if (preferences) {
    navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
  }

  return (
    <CurstomKeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
      <Title>Hello, {user?.firstName}</Title>
      <Title>Let's set up your study platform?</Title>
      <Description>
        Choose content that you want to see on your timeline. The order chosen will be the order of relevance.
      </Description>
      <InputWrapper>
        <FormInput
          placeholder="Choose up to 10 contents"
          autocompleteConfigs={{
            autoCapitalize: 'none',
            autoCorrect: false,
            data: contentTypesStringArray,
            useStateObject: contentState,
          }}
        />
        <FormButton
          disabled={!contentType || selectedContents?.length >= 10}
          onPress={handleAddContent}
        >
          <AddIcon />
        </FormButton>
      </InputWrapper>
      <BadgeWrapper>
        {selectedContents.map(content => (
          <Badge>{content}</Badge>
        ))}
      </BadgeWrapper>
      <ConfirmButton
        onPress={handleSubmit}
      >
        Let's study :)
      </ConfirmButton>
      <NoConfirmButton
        onPress={handleNoChanges}
      >
        Go back to home without changes
      </NoConfirmButton>
    </CurstomKeyboardAwareScrollView>
  );
};
