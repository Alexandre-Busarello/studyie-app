import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackScreenProps } from '~/types/routes/StackScreenProps';
import { clearStudentPreferences } from '~/store/ducks/student';

export const PreferencesScreen = ({ navigation }: StackScreenProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStudentPreferences());
    navigation.reset({
      index: 0,
      routes: [{ name: 'EditSetup' }],
    });
  }, [dispatch, navigation]);

  return <View />;
};
