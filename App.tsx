
import React from 'react';
import "react-native-gesture-handler";

import { Provider } from 'react-redux';

import { store } from '@Store';
import Routes from './src/Routes';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
export default App;
