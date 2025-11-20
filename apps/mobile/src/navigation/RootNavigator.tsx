import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import { useUserMode } from '../store/useUserMode';
import { AuthStack } from './AuthStack';
import { CustomerStack } from './CustomerStack';
import { DriverStack } from './DriverStack';

export const RootNavigator = () => {
    const { isAuthenticated } = useAuthStore();
    const { mode } = useUserMode();

    const linking = {
        prefixes: ['adlgo://', 'https://adlgo.com'],
        config: {
            screens: {
                // Auth Stack
                Onboarding: 'onboarding',
                Login: 'login',
                DriverOnboarding: 'driver/onboarding',

                // Customer Stack
                MainTabs: {
                    screens: {
                        Home: 'home',
                        Wallet: 'wallet',
                        Activity: 'activity',
                        Profile: 'profile',
                    },
                },
                CreateOrder: 'order/create',
                FindingDriver: 'order/finding-driver',

                // Driver Stack
                DriverMap: 'driver/map',
                Earnings: 'driver/earnings',
            },
        },
    };

    return (
        <NavigationContainer linking={linking}>
            {!isAuthenticated ? (
                <AuthStack />
            ) : mode === 'customer' ? (
                <CustomerStack />
            ) : (
                <DriverStack />
            )}
        </NavigationContainer>
    );
};
