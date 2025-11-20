import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Card } from '../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const WalletScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <Text style={styles.headerTitle}>My Wallet</Text>

                {/* Balance Card */}
                <LinearGradient
                    colors={[theme.colors.primary, '#4a69bd']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.balanceCard}
                >
                    <View>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Text style={styles.balanceValue}>₦54,200.00</Text>
                    </View>
                    <View style={styles.cardChip}>
                        <Ionicons name="wifi" size={24} color="rgba(255,255,255,0.5)" />
                    </View>
                </LinearGradient>

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={[styles.actionIcon, { backgroundColor: '#e3f2fd' }]}>
                            <Ionicons name="add" size={24} color="#2196F3" />
                        </View>
                        <Text style={styles.actionText}>Top Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={[styles.actionIcon, { backgroundColor: '#e8f5e9' }]}>
                            <Ionicons name="arrow-down" size={24} color="#4CAF50" />
                        </View>
                        <Text style={styles.actionText}>Withdraw</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={[styles.actionIcon, { backgroundColor: '#fff3e0' }]}>
                            <Ionicons name="swap-horizontal" size={24} color="#FF9800" />
                        </View>
                        <Text style={styles.actionText}>Transfer</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Transactions */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.transactionList}>
                    <Card style={styles.transactionItem} variant="flat">
                        <View style={[styles.transactionIcon, { backgroundColor: '#e3f2fd' }]}>
                            <Ionicons name="car" size={20} color="#2196F3" />
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionTitle}>Ride Payment</Text>
                            <Text style={styles.transactionDate}>Today, 10:23 AM</Text>
                        </View>
                        <Text style={[styles.transactionAmount, { color: theme.colors.danger }]}>-₦1,500</Text>
                    </Card>

                    <Card style={styles.transactionItem} variant="flat">
                        <View style={[styles.transactionIcon, { backgroundColor: '#e8f5e9' }]}>
                            <Ionicons name="add" size={20} color="#4CAF50" />
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionTitle}>Wallet Top Up</Text>
                            <Text style={styles.transactionDate}>Yesterday, 4:00 PM</Text>
                        </View>
                        <Text style={[styles.transactionAmount, { color: theme.colors.success }]}>+₦5,000</Text>
                    </Card>

                    <Card style={styles.transactionItem} variant="flat">
                        <View style={[styles.transactionIcon, { backgroundColor: '#fff3e0' }]}>
                            <Ionicons name="flash" size={20} color="#FF9800" />
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionTitle}>Electricity Bill</Text>
                            <Text style={styles.transactionDate}>Nov 18, 2025</Text>
                        </View>
                        <Text style={[styles.transactionAmount, { color: theme.colors.danger }]}>-₦10,000</Text>
                    </Card>
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
    scrollContent: {
        padding: theme.spacing.l,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.l,
    },
    balanceCard: {
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.l,
        marginBottom: theme.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        ...theme.shadows.medium,
    },
    balanceLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 8,
    },
    balanceValue: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    cardChip: {
        transform: [{ rotate: '90deg' }],
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xl,
    },
    actionButton: {
        alignItems: 'center',
        width: '30%',
    },
    actionIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    seeAllText: {
        color: theme.colors.secondary,
        fontWeight: '600',
    },
    transactionList: {
        gap: theme.spacing.m,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    transactionDate: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
