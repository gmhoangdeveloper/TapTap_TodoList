import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROOT_STACK } from '@Constants/Navigation.Constant';

import MainNavigator from './MainStack';
import TodoStack from './TodoStack';

const NativeStack = createNativeStackNavigator();

type IAppNavigator = {
  initialRouteName: string
}

const AppNavigator = (props: IAppNavigator) => {
  return (
    <NativeStack.Navigator {...props} screenOptions={{ headerShown: false }} >
      <NativeStack.Screen name={ROOT_STACK.ROOT_MAIN_STACK} component={MainNavigator} />
      <NativeStack.Screen name={ROOT_STACK.TODO_STACK} component={TodoStack} />
    </NativeStack.Navigator>
  );
};

export default AppNavigator;
