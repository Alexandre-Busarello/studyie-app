import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ReduxState } from '~/types/store/ReduxState';
import { SideMenu } from '~/components/SideMenu';
import { AuthScreen } from '~/screens/Auth';
import { HomeScreen } from '~/screens/Home';
import { LogoutScreen } from '~/screens/Logout';
import { drawerOptions, stackOptions } from '~/routes/navigatorOptions';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => (
  <Drawer.Navigator
    drawerContent={props => <SideMenu {...props} />}
    drawerContentOptions={drawerOptions}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
  </Drawer.Navigator>
);

export const Routes = () => {
  const user = useSelector((state: ReduxState) => state.user);

  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${user.token}`;

    return config;
  });

  return (
    <NavigationContainer>
      <Stack.Navigator mode="card" screenOptions={stackOptions}>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Root" component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
