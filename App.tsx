import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { PortalProvider } from '@gorhom/portal';
import { store } from '@Store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/Routes';
import { ErrorBoundary } from '@Components/ErrorBoundary';

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <SafeAreaProvider>
          <Provider store={store}>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </Provider>
        </SafeAreaProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
export default App;

