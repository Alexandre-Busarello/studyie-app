import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from '~/store';
import { Routes } from '~/routes';

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <StatusBar backgroundColor="#DB4C77" barStyle="light-content" />
      <Routes />
    </PersistGate>
  </Provider>
);
