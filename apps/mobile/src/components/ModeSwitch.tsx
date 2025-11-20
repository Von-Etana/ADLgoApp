import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useUserMode } from '../store/useUserMode';
import { useAuthStore } from '../store/useAuthStore';

export const ModeSwitch = () => {
    const { mode, toggleMode } = useUserMode();
    const { user } = useAuthStore();

    const handleToggle = () => {
        // Logic: If switching to driver, check verification
        if (mode === 'customer') {
            if (user?.isVerified) {
                toggleMode();
            } else {
                // Show alert or navigation to KYC
                // console.log('User not verified as driver');
                alert('Please complete driver verification first.');
                // For demo purposes, we allow toggle if no user is logged in or just force it
                toggleMode();
            }
        } else {
            toggleMode();
        }
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleToggle} style={styles.container}>
            <View style={[styles.track, mode === 'driver' ? styles.trackDriver : styles.trackCustomer]}>
                <View style={[styles.thumb, mode === 'driver' ? styles.thumbRight : styles.thumbLeft]}>
                    <Text style={styles.thumbText}>{mode === 'driver' ? '🚗' : '👤'}</Text>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, mode === 'customer' && styles.activeLabel]}>User</Text>
                    <Text style={[styles.label, mode === 'driver' && styles.activeLabel]}>Driver</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 140,
        height: 40,
        justifyContent: 'center',
    },
    track: {
        flex: 1,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        position: 'relative',
    },
    trackCustomer: {
        backgroundColor: '#E0E0E0',
    },
    trackDriver: {
        backgroundColor: '#4CAF50', // Success Green
    },
    thumb: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'white',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    thumbLeft: {
        left: 2,
    },
    thumbRight: {
        right: 2,
    },
    thumbText: {
        fontSize: 18,
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        zIndex: 1,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#757575',
    },
    activeLabel: {
        color: 'white',
    },
});
