import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Card } from '../../components/ui/Card';
import { Icon3D } from '../../components/ui/Icon3D';
import { Ionicons } from '@expo/vector-icons';

export const CustomerHomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Text style={styles.username}>Stephen</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        {/* Placeholder for Profile Image */}
                        <View style={styles.profilePlaceholder}>
                            <Text style={styles.profileInitials}>S</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <Card style={styles.searchContainer} variant="elevated">
                    <Ionicons name="search" size={24} color={theme.colors.primary} />
                    <View style={styles.searchTextContainer}>
                        <Text style={styles.searchLabel}>Where to?</Text>
                        <TextInput
                            placeholder="Enter destination"
                            style={styles.searchInput}
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    </View>
                </Card>

                {/* Services Grid */}
                <Text style={styles.sectionTitle}>Services</Text>
                <View style={styles.servicesGrid}>
                    <TouchableOpacity style={styles.serviceItem}>
                        <Card style={styles.serviceCard}>
                            <Icon3D emoji="🚗" color="#74b9ff" />
                            <Text style={styles.serviceText}>Ride</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.serviceItem}>
                        <Card style={styles.serviceCard}>
                            <Icon3D emoji="📦" color="#a29bfe" />
                            <Text style={styles.serviceText}>Package</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.serviceItem}>
                        <Card style={styles.serviceCard}>
                            <Icon3D emoji="⚡" color="#ffeaa7" />
                            <Text style={styles.serviceText}>Bills</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.serviceItem}>
                        <Card style={styles.serviceCard}>
                            <Icon3D emoji="🍔" color="#ff7675" />
                            <Text style={styles.serviceText}>Food</Text>
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Promo Banner */}
                <View style={styles.promoBanner}>
                    <View style={styles.promoContent}>
                        <Text style={styles.promoTitle}>30% OFF</Text>
                        <Text style={styles.promoSubtitle}>On your first delivery</Text>
                    </View>
                    <Icon3D emoji="🎉" size={50} color="transparent" />
                </View>

                {/* Recent Activity */}
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.activityList}>
                    {[1, 2].map((item) => (
                        <Card key={item} style={styles.activityItem} variant="flat">
                            <View style={styles.activityIcon}>
                                <Ionicons name="location" size={20} color={theme.colors.secondary} />
                            </View>
                            <View style={styles.activityDetails}>
                                <Text style={styles.activityTitle}>Home to Office</Text>
                                <Text style={styles.activityDate}>Today, 9:41 AM</Text>
                            </View>
                            <Text style={styles.activityPrice}>₦1,500</Text>
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
    scrollContent: {
        padding: theme.spacing.l,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    greeting: {
        fontSize: 16,
        color: theme.colors.textSecondary,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    profileButton: {
        padding: 4,
        backgroundColor: theme.colors.surface,
        borderRadius: 50,
        ...theme.shadows.small,
    },
    profilePlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitials: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        paddingVertical: theme.spacing.m,
    },
    searchTextContainer: {
        marginLeft: theme.spacing.m,
        flex: 1,
    },
    searchLabel: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    searchInput: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        padding: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xl,
    },
    serviceItem: {
        width: '23%',
        marginBottom: theme.spacing.m,
    },
    serviceCard: {
        alignItems: 'center',
        paddingVertical: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
    },
    serviceText: {
        marginTop: theme.spacing.s,
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.text,
    },
    promoBanner: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.l,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        overflow: 'hidden',
    },
    promoContent: {
        flex: 1,
    },
    promoTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    promoSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    activityList: {
        gap: theme.spacing.m,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    activityDetails: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    activityDate: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    activityPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
});
