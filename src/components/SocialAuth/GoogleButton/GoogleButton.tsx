import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-community/google-signin';
import {
  Button,
  Text,
  GoogleIcon,
} from '~/components/SocialAuth/GoogleButton/GoogleButton.styles';
import { User } from '~/types/entities/User';
import { signInFromGoogle } from '~/store/ducks/user';

export const GoogleButton = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '',
    });
  }, []);

  const handleLogin = async () => {
    await GoogleSignin.hasPlayServices();

    const {
      user: { id, email, givenName, familyName, photo },
    } = await GoogleSignin.signIn();

    const user: User = {
      id,
      email,
      firstName: givenName,
      lastName: familyName,
      pictureUrl: photo,
    };

    await dispatch(signInFromGoogle(user));
  };

  return (
    <Button testID="google-button" onPress={handleLogin}>
      <GoogleIcon />
      <Text>Entrar com o Google</Text>
    </Button>
  );
};
