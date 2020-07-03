import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleButton } from '~/components/SocialAuth';
import AuthenticationSVG from 'assets/images/authentication.svg';
import {
  Container,
  Title,
  AgreementText,
  ButtonsWrapper,
  Form,
  FormInput,
  SubmitButton,
  InvalidLogin,
} from './AuthScreen.styles';
import { View } from 'react-native';
import { ReduxState } from '~/types/store/ReduxState';
import { StackScreenProps } from '~/types/routes/StackScreenProps';
import { signIn } from '~/store/ducks/user';

export const AuthScreen = ({ navigation }: StackScreenProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);
  const loginNotFound = useSelector((state: ReduxState) => state.user.notFound);
  const isLoading = useSelector((state: ReduxState) => state.user.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user?.token) {
      redirectToHomePage();
    }
  }, [user, redirectToHomePage]);

  const redirectToHomePage = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
  };

  if (user?.token) {
    return null;
  }

  function handleSubmit() {
    dispatch(signIn(email, password));
  }

  return (
    <Container>
      <View>
        <Title>Studyie</Title>
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={isLoading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>

          {loginNotFound && (
            <InvalidLogin>
              E-mail ou senha inválidos
            </InvalidLogin>
          )}
        </Form>
      </View>

      <ButtonsWrapper>
        <GoogleButton />
      </ButtonsWrapper>

      <AgreementText>
        Ao continuar, você concorda com nossos Termos de Uso e Política de
        Privacidade
      </AgreementText>
    </Container>
  );
};
