import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { Icon3D } from '../../../components/ui/Icon3D';

export const CreateOrderScreen = ({ navigation }: any) => {
    const [offerPrice, setOfferPrice] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('bike');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Request</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Location Inputs */}
                <Card style={styles.locationCard}>
                    <View style={styles.locationRow}>
                        <View style={[styles.dot, styles.greenDot]} />
                        <Text style={styles.locationText}>Current Location (GPS)</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.locationRow}>
                        <View style={[styles.dot, styles.redDot]} />
                        <TextInput
                            style={styles.locationInput}
                            placeholder="Where to? (Search Destination)"
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    </View>
                </Card>

                {/* Package Details */}
                <Text style={styles.sectionTitle}>What are you sending?</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
                    {['Documents', 'Electronics', 'Food', 'Clothes'].map((cat) => (
                        <TouchableOpacity key={cat} style={styles.categoryChip}>
                            <Text style={styles.categoryText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Vehicle Selection */}
                <Text style={styles.sectionTitle}>Select Vehicle</Text>
                <View style={styles.vehicleGrid}>
                    <TouchableOpacity
                        style={[styles.vehicleOption, selectedVehicle === 'bike' && styles.selectedVehicle]}
                        onPress={() => setSelectedVehicle('bike')}
                    >
                        <Icon3D emoji="🏍️" size={30} />
                        <Text style={styles.vehicleName}>Bike</Text>
                        <Text style={styles.vehiclePrice}>Cheaper</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.vehicleOption, selectedVehicle === 'car' && styles.selectedVehicle]}
                        onPress={() => setSelectedVehicle('car')}
                    >
                        <Icon3D emoji="🚗" size={30} />
                        <Text style={styles.vehicleName}>Car</Text>
                        <Text style={styles.vehiclePrice}>Safer</Text>
                    </TouchableOpacity>
                </View>

                {/* Offer Price */}
                <Text style={styles.sectionTitle}>Offer your price</Text>
                <View style={styles.priceInputContainer}>
                    <Text style={styles.currency}>₦</Text>
                    <TextInput
                        style={styles.priceInput}
                        value={offerPrice}
                        onChangeText={setOfferPrice}
                        placeholder="1,500"
                        keyboardType="numeric"
                    />
                </View>
                <Text style={styles.priceHint}>Recommended: ₦1,400 - ₦1,800</Text>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('FindingDriver')}
                >
                    <Text style={styles.buttonText}>Find Driver</Text>
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
    content: {
        padding: theme.spacing.l,
    },
    locationCard: {
        padding: 0,
        marginBottom: theme.spacing.xl,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: theme.spacing.m,
    },
    greenDot: { backgroundColor: theme.colors.secondary },
    redDot: { backgroundColor: theme.colors.danger },
    locationText: {
        fontSize: 16,
        color: theme.colors.text,
        fontWeight: '500',
    },
    locationInput: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
        padding: 0,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginLeft: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    categoryList: {
        marginBottom: theme.spacing.xl,
    },
    categoryChip: {
        backgroundColor: 'white',
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.s,
        borderRadius: 20,
        marginRight: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    categoryText: {
        color: theme.colors.text,
        fontWeight: '500',
    },
    vehicleGrid: {
        flexDirection: 'row',
        gap: theme.spacing.m,
        marginBottom: theme.spacing.xl,
    },
    vehicleOption: {
        flex: 1,
        backgroundColor: 'white',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedVehicle: {
        borderColor: theme.colors.secondary,
        backgroundColor: '#e0f2f1',
    },
    vehicleName: {
        marginTop: 8,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    vehiclePrice: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    currency: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginRight: theme.spacing.s,
    },
    priceInput: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    priceHint: {
        marginTop: 8,
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    footer: {
        padding: theme.spacing.l,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    button: {
        backgroundColor: theme.colors.secondary,
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
