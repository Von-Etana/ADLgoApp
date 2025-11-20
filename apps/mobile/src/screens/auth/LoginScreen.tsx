import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginScreen = ({ navigation }: any) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const login = useAuthStore((state: any) => state.login);

    const handleLogin = () => {
        // Mock Login Logic
        if (phoneNumber === 'driver') {
            login({ id: '2', name: 'Jane Driver', role: 'driver', isVerified: true }, 'token456');
        } else {
            login({ id: '1', name: 'Stephen', role: 'customer' }, 'token123');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[theme.colors.primary, '#2d3436']}
                style={styles.headerBackground}
            >
                <SafeAreaView style={styles.headerContent}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Enter your phone number to continue</Text>
                </SafeAreaView>
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.formContainer}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="+234 800 000 0000"
                        placeholderTextColor="#a0a0a0"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('DriverOnboarding')} style={{ marginTop: 20 }}>
                    <Text style={[styles.helperText, { color: theme.colors.secondary, fontWeight: 'bold' }]}>
                        Want to drive? Sign up here
                    </Text>
                </TouchableOpacity>

                <Text style={styles.helperText}>
                    By continuing, you agree to our Terms & Privacy Policy.
                </Text>
                <Text style={styles.hintText}>
                    (Hint: Type "driver" to login as Driver, anything else for Customer)
                </Text>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerBackground: {
        height: '40%',
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.l,
        borderBottomRightRadius: 80,
    },
    headerContent: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: theme.spacing.s,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
    formContainer: {
        flex: 1,
        padding: theme.spacing.l,
        marginTop: theme.spacing.l,
    },
    inputContainer: {
        marginBottom: theme.spacing.xl,
    },
    label: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.s,
        fontWeight: '600',
    },
    input: {
        backgroundColor: 'white',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        fontSize: 18,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    button: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        ...theme.shadows.medium,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    helperText: {
        marginTop: theme.spacing.l,
        textAlign: 'center',
        color: theme.colors.textSecondary,
        fontSize: 12,
    },
    hintText: {
        marginTop: theme.spacing.s,
        textAlign: 'center',
        color: theme.colors.primary,
        fontSize: 12,
        fontStyle: 'italic',
    },
});
