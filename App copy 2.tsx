/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';


import { Provider } from 'react-redux';

import 'react-native-gesture-handler';

import { store } from '@Store';
import Routes from 'src/Routes';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>

  );
}
export default App;
