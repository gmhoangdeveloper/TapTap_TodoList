import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Icon } from '@Components/Icon';
import { MAIN_STACK } from '@Constants/Navigation.Constant';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Calendar, TodoList } from '@Screens';
import Styles from '@Styles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const tabBarLabelStyle = {
    fontSize: 12,
    fontFamily: Styles.fontFamily.regular
}

const MainNavigator = (props: BottomTabScreenProps<any>) => {
    const insets = useSafeAreaInsets();

    return (<>
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveTintColor: '#9C9CB1',
                tabBarActiveTintColor: Styles.palette.light.main,
                tabBarItemStyle: { paddingVertical: Styles.padding.xs },
                headerShown: false,
                tabBarStyle: { height: 60 + insets.bottom },
            }}
            initialRouteName={MAIN_STACK.CANLENDAR}>
            <Tab.Screen
                name={MAIN_STACK.CANLENDAR}
                initialParams={props.route.params}
                component={Calendar}
                options={({ route }) => ({
                    tabBarLabel: 'Hôm nay',
                    tabBarLabelStyle,
                    tabBarIcon: ({ focused }) => <Icon name='calendar' type='AntDesign' size={23} color={focused ? Styles.palette.light.main : Styles.text.primaryColor} />
                })}
            />
            <Tab.Screen
                name={MAIN_STACK.TODO_LIST}
                initialParams={props.route.params}
                component={TodoList}
                options={({ route }) => ({
                    tabBarLabel: 'Công việc',
                    tabBarLabelStyle,
                    tabBarIcon: ({ focused }) => <Icon name='list' type='Feather' size={23} color={focused ? Styles.palette.light.main : Styles.text.primaryColor} />

                })}
            />
        </Tab.Navigator>
    </>
    );
}

const styles = StyleSheet.create({

})

export default MainNavigator;
