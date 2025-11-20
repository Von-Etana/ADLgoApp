import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppTabs } from './AppTabs';
import { CreateOrderScreen } from '../screens/customer/order/CreateOrderScreen';
import { FindingDriverScreen } from '../screens/customer/order/FindingDriverScreen';

const Stack = createNativeStackNavigator();

export const CustomerStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={AppTabs} />
            <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
            <Stack.Screen name="FindingDriver" component={FindingDriverScreen} />
        </Stack.Navigator>
    );
};
