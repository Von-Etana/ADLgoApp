import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ModeSwitch } from '../components/ModeSwitch';

const Stack = createNativeStackNavigator();



import { EarningsScreen } from '../screens/driver/EarningsScreen';

import { DriverMapScreen } from '../screens/driver/DriverMapScreen';

export const DriverStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hide default header
            }}
        >
            <Stack.Screen name="DriverMap" component={DriverMapScreen} />
            <Stack.Screen name="Earnings" component={EarningsScreen} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    statusContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 },
    statusText: { fontWeight: '600' }
});
