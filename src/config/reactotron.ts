import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

const tron = Reactotron.configure({
  host: 'localhost',
  port: 9090,
})
  .setAsyncStorageHandler(AsyncStorage)
  .use(reactotronRedux())
  .useReactNative()
  .connect();

// @ts-ignore - register the tron log in the console object
console.tron = tron;

tron.clear();

export default tron;
