import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { ModeSwitch } from '../components/ModeSwitch';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { CustomerHomeScreen } from '../screens/customer/HomeScreen';
import { WalletScreen } from '../screens/customer/WalletScreen';

const Tab = createBottomTabNavigator();

import { ActivityScreen } from '../screens/customer/ActivityScreen';
import { ProfileSettingsScreen } from '../screens/customer/ProfileSettingsScreen';

export const AppTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // Hide default header
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderTopWidth: 0,
                    backgroundColor: 'white',
                    ...theme.shadows.large
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
            }}
        >
            <Tab.Screen
                name="Home"
                component={CustomerHomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Wallet"
                component={WalletScreen}
                options={{
                    tabBarLabel: 'Wallet',
                    tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Activity"
                component={ActivityScreen}
                options={{
                    tabBarLabel: 'Activity',
                    tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileSettingsScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});
