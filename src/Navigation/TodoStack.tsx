import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { TODO_STACK } from '@Constants/Navigation.Constant';
import { AddTodo } from '@Screens';

const Stack = createNativeStackNavigator();

const TodoStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={TODO_STACK.ADD_TODO} component={AddTodo} />
        </Stack.Navigator>
    );
};

export default TodoStack;
