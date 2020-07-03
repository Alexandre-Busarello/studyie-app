import React from 'react';
import { HeaderIcon } from '~/components/HeaderIcon';
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import { DrawerContentOptions } from '@react-navigation/drawer';

export const stackOptions = ({ navigation }): StackNavigationOptions => ({
  title: 'Studyie',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#db4c77',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerLeft: () => <HeaderIcon navigation={navigation} />,
  ...TransitionPresets.SlideFromRightIOS,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 350 },
    },
    close: {
      animation: 'timing',
      config: { duration: 250 },
    },
  },
});

export const drawerOptions: DrawerContentOptions = {
  activeTintColor: '#db4c77',
  activeBackgroundColor: '#fff',
  contentContainerStyle: {
    padding: 0,
  },
  labelStyle: {
    fontSize: 15,
  },
};
