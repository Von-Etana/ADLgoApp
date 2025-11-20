import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'flat' | 'elevated';
}

export const Card = ({ children, style, variant = 'elevated' }: CardProps) => {
    return (
        <View style={[
            styles.card,
            variant === 'elevated' && theme.shadows.medium,
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.m,
    },
});
