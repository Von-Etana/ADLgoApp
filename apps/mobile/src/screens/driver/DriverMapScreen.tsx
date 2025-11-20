import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Card } from '../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const DriverMapScreen = () => {
    const [isOnline, setIsOnline] = useState(false);

    return (
        <View style={styles.container}>
            {/* Placeholder Map Background */}
            <View style={styles.mapBackground}>
                <Text style={styles.mapText}>Map View Placeholder</Text>
                <View style={styles.myLocation}>
                    <View style={styles.myLocationDot} />
                </View>
            </View>

            {/* Top Bar */}
            <SafeAreaView style={styles.topBar} edges={['top']}>
                <View style={styles.earningBadge}>
                    <Text style={styles.earningLabel}>Today</Text>
                    <Text style={styles.earningValue}>₦12,500</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person" size={20} color="white" />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Bottom Control Panel */}
            <View style={styles.bottomPanel}>
                <Card style={styles.statusCard} variant="elevated">
                    <View style={styles.statusInfo}>
                        <Text style={styles.statusTitle}>{isOnline ? 'You are Online' : 'You are Offline'}</Text>
                        <Text style={styles.statusSubtitle}>
                            {isOnline ? 'Finding rides near you...' : 'Go online to start earning'}
                        </Text>
                    </View>
                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: '#767577', true: theme.colors.secondary }}
                        thumbColor={'white'}
                    />
                </Card>

                {isOnline && (
                    <View style={styles.metricsContainer}>
                        <Card style={styles.metricCard}>
                            <Text style={styles.metricValue}>4.9</Text>
                            <Text style={styles.metricLabel}>Rating</Text>
                        </Card>
                        <Card style={styles.metricCard}>
                            <Text style={styles.metricValue}>85%</Text>
                            <Text style={styles.metricLabel}>Acceptance</Text>
                        </Card>
                        <Card style={styles.metricCard}>
                            <Text style={styles.metricValue}>12</Text>
                            <Text style={styles.metricLabel}>Trips</Text>
                        </Card>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    mapBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        color: '#a0a0a0',
        fontSize: 24,
        fontWeight: 'bold',
    },
    myLocation: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(0, 184, 148, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    myLocationDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.secondary,
        borderWidth: 3,
        borderColor: 'white',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.l,
        paddingTop: theme.spacing.s,
    },
    earningBadge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s,
        borderRadius: theme.borderRadius.l,
        ...theme.shadows.medium,
    },
    earningLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    earningValue: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.medium,
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing.l,
        paddingBottom: theme.spacing.xl + 20, // Extra padding for safe area
    },
    statusCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.l,
        marginBottom: theme.spacing.m,
    },
    statusInfo: {
        flex: 1,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    statusSubtitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: theme.spacing.m,
    },
    metricCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: theme.spacing.m,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    metricLabel: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
});
