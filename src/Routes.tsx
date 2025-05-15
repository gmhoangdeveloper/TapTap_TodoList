import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { hideSplash } from 'react-native-splash-view';
import AppNavigator from './Navigation/AppNavigator';

const Routes = () => {
    React.useEffect(() => {
        hideSplash(); // Hide after some time
    }, []);

    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    )
}

export default Routes