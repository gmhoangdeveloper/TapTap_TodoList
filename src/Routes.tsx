import { TODO_STORAGE_KEY } from '@Constants/Configs.Constants';
import { ROOT_STACK } from '@Constants/Navigation.Constant';
import { useAppDispatch } from '@Store';
import { setTodo } from '@Store/Todo';
import storage from '@Utils/AsyncStorage';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { hideSplash } from 'react-native-splash-view';
import AppNavigator from './Navigation/AppNavigator';

const Routes = () => {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        const loadState = async () => {
            const data = await storage.getItem(TODO_STORAGE_KEY);
            if (data) {
                dispatch(setTodo(data));
            }
            hideSplash();
        };
        loadState();
    }, []);

    return (
        <NavigationContainer>
            <AppNavigator initialRouteName={ROOT_STACK.ROOT_MAIN_STACK} />
        </NavigationContainer>
    )
}

export default Routes