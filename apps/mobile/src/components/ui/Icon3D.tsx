import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface Icon3DProps {
    emoji: string;
    size?: number;
    color?: string;
}

export const Icon3D = ({ emoji, size = 40, color = theme.colors.accent }: Icon3DProps) => {
    return (
        <View style={[styles.container, { width: size * 1.5, height: size * 1.5, backgroundColor: color + '20' }]}>
            <Text style={{ fontSize: size }}>{emoji}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.borderRadius.l,
    },
});
