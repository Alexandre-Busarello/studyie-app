import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Container,
  Title,
  AgreementText,
  Form,
  FormInput,
  SubmitButton,
  ErrorMessage,
  SignLink,
  SignLinkText,
} from './SignupScreen.styles';
import { View } from 'react-native';
import { ReduxState } from '~/types/store/ReduxState';
import { StackScreenProps } from '~/types/routes/StackScreenProps';
import { signUp } from '~/store/ducks/login';

export const SignupScreen = ({ navigation }: StackScreenProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: ReduxState) => state.login.isLoading);
  const errorMessage = useSelector(
    (state: ReduxState) => state.login.errorMessage,
  );
  const userCreated = useSelector(
    (state: ReduxState) => state.login.userCreated,
  );

  if (userCreated) {
    navigation.navigate('Auth');
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signUp(name, email, password));
  }

  const renderError = () => {
    if (!errorMessage) {
      return null;
    }
    return <ErrorMessage>{errorMessage}</ErrorMessage>;
  };

  return (
    <KeyboardAwareScrollView>
      <Container>
        <View>
          <Title>New account</Title>
          <Form>
            <FormInput
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Full name"
              returnKeyType="next"
              value={name}
              onChangeText={setName}
            />

            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Type your e-mail"
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Your secret password"
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}
            />

            <SubmitButton loading={isLoading} onPress={handleSubmit}>
              Create an account
            </SubmitButton>

            {renderError()}
          </Form>

          <SignLink onPress={() => navigation.navigate('Auth')}>
            <SignLinkText>I already have an account</SignLinkText>
          </SignLink>
        </View>

        <AgreementText>
          By continuing, you agree to our Terms of Use and Privacy Policy
        </AgreementText>
      </Container>
    </KeyboardAwareScrollView>
  );
};
