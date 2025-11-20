import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Card } from '../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

const MOCK_ACTIVITY = [
    { id: '1', type: 'ride', title: 'Ride to Airport', date: 'Today, 8:00 AM', price: '₦4,500', status: 'Completed' },
    { id: '2', type: 'delivery', title: 'Package to Ikeja', date: 'Yesterday, 2:30 PM', price: '₦2,000', status: 'Completed' },
    { id: '3', type: 'bill', title: 'MTN Airtime', date: 'Nov 18, 10:00 AM', price: '₦1,000', status: 'Success' },
];

export const ActivityScreen = () => {
    const renderItem = ({ item }: any) => (
        <Card style={styles.itemCard} variant="flat">
            <View style={[styles.iconContainer, { backgroundColor: item.type === 'ride' ? '#e3f2fd' : item.type === 'delivery' ? '#e8f5e9' : '#fff3e0' }]}>
                <Ionicons
                    name={item.type === 'ride' ? 'car' : item.type === 'delivery' ? 'cube' : 'flash'}
                    size={24}
                    color={item.type === 'ride' ? '#2196F3' : item.type === 'delivery' ? '#4CAF50' : '#FF9800'}
                />
            </View>
            <View style={styles.details}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
                <Text style={styles.itemStatus}>{item.status}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </Card>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>Activity</Text>
            <FlatList
                data={MOCK_ACTIVITY}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        padding: theme.spacing.l,
    },
    listContent: {
        paddingHorizontal: theme.spacing.l,
        gap: theme.spacing.m,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    details: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    itemDate: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 2,
    },
    itemStatus: {
        fontSize: 12,
        color: theme.colors.success,
        fontWeight: '500',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
});
