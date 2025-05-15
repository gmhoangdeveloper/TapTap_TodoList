import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Icon } from '@Components/Icon';
import { MAIN_STACK } from '@Constants/Navigation.Constant';
import { Calendar } from '@Screens';
import Styles from '@Styles';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const tabBarLabelStyle = {
    fontSize: 12,
    fontFamily: Styles.fontFamily.regular
}

const MainNavigator = ((props) => {
    return (<>
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveTintColor: '#9C9CB1',
                tabBarActiveTintColor: Styles.palette.light.main,
                tabBarItemStyle: { paddingVertical: Styles.padding.xs },
                headerShown: false
            }}
            initialRouteName={MAIN_STACK.CANLENDAR}>
            <Tab.Screen
                name={MAIN_STACK.CANLENDAR}
                initialParams={props.route.params}
                component={Calendar}
                options={({ route }) => ({
                    tabBarLabel: 'Lịch',
                    tabBarLabelStyle,
                    tabBarIcon: ({ focused }) => <Icon name='calendar' type='AntDesign' size={23} color={focused ? Styles.palette.light.main : Styles.text.primaryColor} />
                })}
            />
            <Tab.Screen
                name={MAIN_STACK.TODO_LIST}
                initialParams={props.route.params}
                component={() => <></>}
                options={({ route }) => ({
                    tabBarLabel: 'Công việc',
                    tabBarLabelStyle,
                    tabBarIcon: ({ focused }) => <Icon name='list' type='Feather' size={23} color={focused ? Styles.palette.light.main : Styles.text.primaryColor} />

                })}
            />
        </Tab.Navigator>
    </>
    );
});

const styles = StyleSheet.create({

})

export default MainNavigator;
