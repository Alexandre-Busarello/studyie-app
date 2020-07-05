import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SideMenu } from '~/components/SideMenu';
import { AuthScreen } from '~/screens/Auth';
import { HomeScreen } from '~/screens/Home';
import { SetupScreen } from '~/screens/Setup';
import { LessonScreen } from '~/screens/Lesson';
import { PreferencesScreen } from '~/screens/Preferences';
import { LogoutScreen } from '~/screens/Logout';
import { SignupScreen } from '~/screens/Signup';
import { drawerOptions, stackOptions } from '~/routes/navigatorOptions';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => (
  <Drawer.Navigator
    drawerContent={props => <SideMenu {...props} />}
    drawerContentOptions={drawerOptions}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Preferences" component={PreferencesScreen} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
  </Drawer.Navigator>
);

const Setup = () => (
  <Drawer.Navigator
    drawerContent={props => <SideMenu {...props} />}
    drawerContentOptions={drawerOptions}>
    <Drawer.Screen name="Setup" component={SetupScreen} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
  </Drawer.Navigator>
);

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="card" screenOptions={stackOptions}>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Setup" component={Setup} />
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen
          name="Lesson"
          component={LessonScreen}
          initialParams={{ lesson: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
