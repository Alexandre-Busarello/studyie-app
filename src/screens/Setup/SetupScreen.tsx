import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadContentTypesData } from '~/store/ducks/data';
import { saveStudentPreferences } from '~/store/ducks/student';
import { User } from '~/types/entities/User';
import { ContentType } from '~/types/entities/ContentType';

import {
  CurstomKeyboardAwareScrollView,
  Title,
  Description,
  FormInput,
  InputWrapper,
  FormButton,
  BadgeWrapper,
  SelectedBadge,
  Badge,
  ConfirmButton
} from './SetupScreen.styles';

export const SetupScreen = ({ navigation }: StackScreenProps) => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: ReduxState) => state.login.data);
  const contentTypes = useSelector(
    (state: ReduxState) => state.data.contentTypes,
  );
  const preferences: ContentType = useSelector((state: ReduxState) => state.student.preferences);
  const isLoading: ContentType = useSelector((state: ReduxState) => state.student.isLoading);

  const contentTypesStringArray = contentTypes?.map(c => c.name);

  const [contentType, setContentType] = useState('');
  const [selectedContents, setSelectedContents] = useState([]);

  useEffect(() => {
    if (preferences) {
      navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
    }
    dispatch(loadContentTypesData());
  }, [dispatch, preferences]);

  function handleAddContent() {
    if (!contentType || selectedContents?.length >= 10) {
      return null;
    };
    if (selectedContents.find(c => c === contentType)) {
      return null;
    };
    setSelectedContents([...selectedContents, contentType]);
  }

  function handleSubmit() {
    dispatch(saveStudentPreferences(selectedContents));
  }

  return (
    <CurstomKeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
      <Title>Olá, {user?.firstName}</Title>
      <Title>Vamos configurar sua plataforma de estudo?</Title>
      <Description>
        Escolha conteúdos que você gostaria de ver na sua timeline. A ordem escolhida será a ordem de relevância.
      </Description>
      <InputWrapper>
        <FormInput
          placeholder="Escolha até 10 conteúdos"
          autocompleteConfigs={{
            autoCapitalize: 'none',
            autoCorrect: false,
            data: contentTypesStringArray,
            setData: setContentType,
          }}
        />
        <FormButton
          disabled={!contentType || selectedContents?.length >= 10}
          onPress={handleAddContent}
        >
          Add
        </FormButton>
      </InputWrapper>
      <BadgeWrapper>
        {selectedContents.map(content => (
          <Badge>{content}</Badge>
        ))}
      </BadgeWrapper>
      <ConfirmButton
        loading={isLoading}
        onPress={handleSubmit}
      >
        Salvar
      </ConfirmButton>
    </CurstomKeyboardAwareScrollView>
  );
};
