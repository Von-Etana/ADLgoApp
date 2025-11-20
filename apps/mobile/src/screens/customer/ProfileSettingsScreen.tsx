import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export const ProfileSettingsScreen = ({ navigation }: any) => {
    const [name, setName] = useState('Stephen');
    const [email, setEmail] = useState('stephen@example.com');
    const [referralCode, setReferralCode] = useState('STEPHEN123');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile Settings</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Info</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Full Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email Address"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Referral System</Text>
                    <View style={styles.referralCard}>
                        <Text style={styles.referralLabel}>Your Referral Code</Text>
                        <Text style={styles.referralCode}>{referralCode}</Text>
                        <Text style={styles.referralDesc}>Share this code and earn ₦500 for every new user!</Text>
                        <TouchableOpacity style={styles.shareButton}>
                            <Text style={styles.shareButtonText}>Share Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    content: {
        padding: theme.spacing.m,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.m,
    },
    input: {
        backgroundColor: 'white',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.m,
        fontSize: 16,
    },
    referralCard: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
    },
    referralLabel: {
        color: 'rgba(255,255,255,0.8)',
        marginBottom: theme.spacing.s,
    },
    referralCode: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: theme.spacing.m,
        letterSpacing: 2,
    },
    referralDesc: {
        color: 'white',
        textAlign: 'center',
        marginBottom: theme.spacing.m,
    },
    shareButton: {
        backgroundColor: 'white',
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.s,
        borderRadius: theme.borderRadius.s,
    },
    shareButtonText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: theme.colors.secondary,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
