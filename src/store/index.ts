import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { reducers } from '~/store/ducks';
import Reactotron from '~/config/reactotron';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'],
};

export const store = createStore(
  persistReducer(persistConfig, reducers),
  compose(
    applyMiddleware(thunk),
    Reactotron.createEnhancer(),
  ),
);

export const persistedStore = persistStore(store);
