import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleButton } from '~/components/SocialAuth';
import {
  Container,
  Title,
  ButtonsWrapper,
  Form,
  FormInput,
  SubmitButton,
  InvalidLogin,
  SignLink,
  SignLinkText
} from './AuthScreen.styles';
import { View } from 'react-native';
import { ReduxState } from '~/types/store/ReduxState';
import { StackScreenProps } from '~/types/routes/StackScreenProps';
import { signIn, resetUserCreated } from '~/store/ducks/login';

interface RefInput {
  focus: () => void;
}

export const AuthScreen = ({ navigation }: StackScreenProps) => {
  const dispatch = useDispatch();
  const passwordRef = useRef<RefInput>(null);

  const login = useSelector((state: ReduxState) => state.login);
  const loginNotFound = useSelector((state: ReduxState) => state.login.notFound);
  const isLoading = useSelector((state: ReduxState) => state.login.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectToHomePage = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Setup' }] });
  };

  useEffect(() => {
    if (login?.token) {
      redirectToHomePage();
    }
    dispatch(resetUserCreated());
  }, [login, redirectToHomePage]);

  if (login?.token) {
    return null;
  }

  function handleSubmit() {
    dispatch(signIn(email, password));
  }

  return (
    <KeyboardAwareScrollView>
      <Container>
        <View>
          <Title>Studyie</Title>
          <Form>
            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Type your e-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef?.current?.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Your secret password"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}
            />

            <SubmitButton loading={isLoading} onPress={handleSubmit}>
              Login
            </SubmitButton>

            {loginNotFound && (
              <InvalidLogin>
                Invalid email or password
              </InvalidLogin>
            )}
          </Form>

          <SignLink onPress={() => navigation.navigate('SignUp')}>
            <SignLinkText>Create a free account</SignLinkText>
          </SignLink>
        </View>

        <ButtonsWrapper>
          <GoogleButton />
        </ButtonsWrapper>
      </Container>
    </KeyboardAwareScrollView>
  );
};
