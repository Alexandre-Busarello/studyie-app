import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import {
  DrawerIcon,
  BackIcon,
} from '~/components/HeaderIcon/HeaderIcon.styles';
import { StackScreenProps } from '~/types/routes/StackScreenProps';

export const HeaderIcon = ({ navigation }: StackScreenProps) => {
  const backToPreviousScreen = () => {
    navigation.goBack();
  };

  const toggleSideMenu = async () => {
    await navigation.dispatch(DrawerActions.toggleDrawer());
  };

  if (navigation.canGoBack()) {
    return <BackIcon testID="back-icon" onPress={backToPreviousScreen} />;
  }

  return <DrawerIcon testID="drawer-icon" onPress={toggleSideMenu} />;
};
