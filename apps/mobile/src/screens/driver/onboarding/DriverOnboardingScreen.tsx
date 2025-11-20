import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { Icon3D } from '../../../components/ui/Icon3D';

export const DriverOnboardingScreen = ({ navigation }: any) => {
    const [step, setStep] = useState(1);
    const [vehicleType, setVehicleType] = useState('car');

    const renderStep1 = () => (
        <View>
            <Text style={styles.stepTitle}>Personal Details</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} placeholder="John Doe" />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput style={styles.input} placeholder="+234..." keyboardType="phone-pad" />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} placeholder="House Address" />
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View>
            <Text style={styles.stepTitle}>Vehicle Details</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vehicleSelector}>
                {['bike', 'car', 'van', 'truck'].map((type) => (
                    <TouchableOpacity key={type} onPress={() => setVehicleType(type)} style={styles.vehicleOption}>
                        <Card
                            style={[
                                styles.vehicleCard,
                                vehicleType === type && { borderColor: theme.colors.secondary, borderWidth: 2 }
                            ]}
                        >
                            <Icon3D emoji={type === 'bike' ? '🏍️' : type === 'car' ? '🚗' : type === 'van' ? '🚐' : '🚚'} size={40} />
                            <Text style={styles.vehicleLabel}>{type.toUpperCase()}</Text>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Vehicle Brand</Text>
                <TextInput style={styles.input} placeholder="Toyota" />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Model & Year</Text>
                <TextInput style={styles.input} placeholder="Camry 2015" />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Plate Number</Text>
                <TextInput style={styles.input} placeholder="ABC-123-XY" />
            </View>

            <Text style={styles.subTitle}>Documents</Text>
            <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="cloud-upload" size={24} color={theme.colors.primary} />
                <Text style={styles.uploadText}>Upload Driver's License</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="cloud-upload" size={24} color={theme.colors.primary} />
                <Text style={styles.uploadText}>Upload Vehicle Registration</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.verificationContainer}>
            <Text style={styles.stepTitle}>Identity Verification</Text>
            <View style={styles.cameraPlaceholder}>
                <Ionicons name="camera" size={60} color="#ccc" />
                <Text style={styles.cameraText}>Take a Selfie</Text>
            </View>
            <Text style={styles.infoText}>
                Please ensure your face is clearly visible. We will match this against your ID.
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Driver Registration</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (step < 3) setStep(step + 1);
                        else alert('Verification Pending. We will notify you in 24hrs.');
                    }}
                >
                    <Text style={styles.buttonText}>{step === 3 ? 'Submit Application' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
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
        padding: theme.spacing.l,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#e0e0e0',
        marginHorizontal: theme.spacing.l,
        borderRadius: 2,
        marginBottom: theme.spacing.l,
    },
    progressFill: {
        height: '100%',
        backgroundColor: theme.colors.secondary,
        borderRadius: 2,
    },
    content: {
        padding: theme.spacing.l,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.l,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginTop: theme.spacing.l,
        marginBottom: theme.spacing.m,
    },
    inputGroup: {
        marginBottom: theme.spacing.m,
    },
    label: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: 'white',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontSize: 16,
    },
    vehicleSelector: {
        marginBottom: theme.spacing.l,
    },
    vehicleOption: {
        marginRight: theme.spacing.m,
    },
    vehicleCard: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    vehicleLabel: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
        marginBottom: theme.spacing.m,
        justifyContent: 'center',
    },
    uploadText: {
        marginLeft: theme.spacing.m,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    verificationContainer: {
        alignItems: 'center',
    },
    cameraPlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
        borderWidth: 2,
        borderColor: theme.colors.border,
    },
    cameraText: {
        marginTop: theme.spacing.s,
        color: theme.colors.textSecondary,
    },
    infoText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        paddingHorizontal: theme.spacing.l,
    },
    footer: {
        padding: theme.spacing.l,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
