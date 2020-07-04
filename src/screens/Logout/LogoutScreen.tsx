import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '~/store/ducks/login';

export const LogoutScreen = ({ navigation }: StackScreenProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  }, [dispatch, navigation]);

  return <View />;
};
