import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MOCK_BIDS = [
    { id: '1', name: 'Musa', rating: 4.8, vehicle: 'Toyota Camry', price: 1800, time: '3 min' },
    { id: '2', name: 'John', rating: 4.5, vehicle: 'Bajaj Bike', price: 1500, time: '5 min' },
    { id: '3', name: 'Chinedu', rating: 4.9, vehicle: 'Honda Accord', price: 2000, time: '2 min' },
];

export const FindingDriverScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Radar Animation Area (Placeholder) */}
            <View style={styles.radarContainer}>
                <View style={styles.radarCircle1}>
                    <View style={styles.radarCircle2}>
                        <Ionicons name="search" size={40} color="white" />
                    </View>
                </View>
                <Text style={styles.radarText}>Looking for drivers nearby...</Text>
            </View>

            {/* Bids List */}
            <View style={styles.bidsContainer}>
                <Text style={styles.bidsTitle}>Drivers Offering Rides</Text>
                <FlatList
                    data={MOCK_BIDS}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card style={styles.bidCard} variant="elevated">
                            <View style={styles.driverInfo}>
                                <View style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarText}>{item.name[0]}</Text>
                                </View>
                                <View>
                                    <Text style={styles.driverName}>{item.name}</Text>
                                    <Text style={styles.driverVehicle}>{item.vehicle} • {item.rating} ★</Text>
                                </View>
                            </View>
                            <View style={styles.bidAction}>
                                <Text style={styles.bidPrice}>₦{item.price}</Text>
                                <TouchableOpacity style={styles.acceptButton}>
                                    <Text style={styles.acceptText}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    )}
                    contentContainerStyle={styles.listContent}
                />
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>Cancel Request</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    radarContainer: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radarCircle1: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    radarCircle2: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radarText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    bidsContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: theme.spacing.l,
    },
    bidsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.l,
    },
    listContent: {
        gap: theme.spacing.m,
    },
    bidCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    avatarText: {
        fontWeight: 'bold',
        color: theme.colors.textSecondary,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    driverVehicle: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    bidAction: {
        alignItems: 'flex-end',
    },
    bidPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    acceptButton: {
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: theme.spacing.m,
        paddingVertical: 6,
        borderRadius: 15,
    },
    acceptText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: theme.spacing.l,
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    cancelText: {
        color: theme.colors.danger,
        fontWeight: '600',
    },
});
