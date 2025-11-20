import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Card } from '../../components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';

export const EarningsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.headerTitle}>Earnings</Text>

                {/* Total Earnings Card */}
                <LinearGradient
                    colors={[theme.colors.secondary, '#00b894']}
                    style={styles.earningsCard}
                >
                    <Text style={styles.earningsLabel}>Total Earnings (Today)</Text>
                    <Text style={styles.earningsValue}>₦12,500.00</Text>
                    <View style={styles.statsRow}>
                        <View>
                            <Text style={styles.statLabel}>Trips</Text>
                            <Text style={styles.statValue}>8</Text>
                        </View>
                        <View>
                            <Text style={styles.statLabel}>Online</Text>
                            <Text style={styles.statValue}>4h 20m</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Weekly Chart Placeholder */}
                <Card style={styles.chartCard}>
                    <Text style={styles.cardTitle}>Weekly Summary</Text>
                    <View style={styles.chartPlaceholder}>
                        {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                            <View key={i} style={styles.barContainer}>
                                <View style={[styles.bar, { height: `${h}%` }]} />
                                <Text style={styles.dayLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Recent Trips */}
                <Text style={styles.sectionTitle}>Recent Trips</Text>
                <View style={styles.tripsList}>
                    {[1, 2, 3].map((i) => (
                        <Card key={i} style={styles.tripItem} variant="flat">
                            <View style={styles.tripDetails}>
                                <Text style={styles.tripTime}>10:30 AM</Text>
                                <Text style={styles.tripRoute}>Lekki Phase 1 to VI</Text>
                            </View>
                            <Text style={styles.tripPrice}>₦2,500</Text>
                        </Card>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.l,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.l,
    },
    earningsCard: {
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.l,
        marginBottom: theme.spacing.xl,
        ...theme.shadows.medium,
    },
    earningsLabel: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        marginBottom: 8,
    },
    earningsValue: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: theme.spacing.l,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        paddingTop: theme.spacing.m,
    },
    statLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    statValue: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    chartCard: {
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.l,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.l,
    },
    chartPlaceholder: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    barContainer: {
        alignItems: 'center',
        width: 20,
        height: '100%',
        justifyContent: 'flex-end',
    },
    bar: {
        width: 8,
        backgroundColor: theme.colors.secondary,
        borderRadius: 4,
        marginBottom: 8,
    },
    dayLabel: {
        fontSize: 10,
        color: theme.colors.textSecondary,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    tripsList: {
        gap: theme.spacing.m,
    },
    tripItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    tripDetails: {
        flex: 1,
    },
    tripTime: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 2,
    },
    tripRoute: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
    },
    tripPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.secondary,
    },
});
