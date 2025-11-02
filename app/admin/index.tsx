import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Users, FileText, CheckCircle, XCircle, Clock, TrendingUp, Package, Wallet } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPanelScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingKYC: 0,
    activePartners: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [pendingVerifications, setPendingVerifications] = useState([]);

  useEffect(() => {
    loadAdminStats();
    loadPendingVerifications();
  }, []);

  const loadAdminStats = async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get pending KYC
      const { count: pendingKYC } = await supabase
        .from('kyc_documents')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Get active partners
      const { count: activePartners } = await supabase
        .from('partner_profiles')
        .select('*', { count: 'exact', head: true })
        .eq('verification_status', 'approved')
        .eq('is_online', true);

      // Get total orders
      const { count: totalOrders } = await supabase
        .from('delivery_orders')
        .select('*', { count: 'exact', head: true });

      // Calculate total revenue (simplified)
      const { data: orders } = await supabase
        .from('delivery_orders')
        .select('total_cost')
        .eq('payment_status', 'completed');

      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_cost || 0), 0) || 0;

      setStats({
        totalUsers: totalUsers || 0,
        pendingKYC: pendingKYC || 0,
        activePartners: activePartners || 0,
        totalOrders: totalOrders || 0,
        totalRevenue
      });
    } catch (error) {
      console.error('Error loading admin stats:', error);
    }
  };

  const loadPendingVerifications = async () => {
    try {
      const { data } = await supabase
        .from('kyc_documents')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            role
          )
        `)
        .eq('status', 'pending')
        .limit(10);

      if (data) {
        setPendingVerifications(data);
      }
    } catch (error) {
      console.error('Error loading pending verifications:', error);
    }
  };

  const handleVerificationAction = async (documentId: string, action: 'approve' | 'reject', notes?: string) => {
    try {
      const status = action === 'approve' ? 'approved' : 'rejected';

      const { error } = await supabase
        .from('kyc_documents')
        .update({
          status,
          review_notes: notes,
          reviewed_by: profile?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', documentId);

      if (!error) {
        Alert.alert('Success', `Document ${action}d successfully`);
        loadPendingVerifications();
        loadAdminStats();
      }
    } catch (error) {
      console.error('Error updating verification:', error);
      Alert.alert('Error', 'Failed to update verification status');
    }
  };

  const adminActions = [
    {
      title: 'User Management',
      description: 'View and manage all users',
      icon: Users,
      action: () => Alert.alert('User Management', 'User management functionality will be implemented'),
    },
    {
      title: 'KYC Verifications',
      description: 'Review pending KYC submissions',
      icon: FileText,
      action: () => Alert.alert('KYC Management', 'KYC management functionality will be implemented'),
    },
    {
      title: 'Partner Approvals',
      description: 'Approve new delivery partners',
      icon: CheckCircle,
      action: () => Alert.alert('Partner Approvals', 'Partner approval functionality will be implemented'),
    },
    {
      title: 'Order Monitoring',
      description: 'Monitor all delivery orders',
      icon: Package,
      action: () => Alert.alert('Order Monitoring', 'Order monitoring functionality will be implemented'),
    },
    {
      title: 'Financial Reports',
      description: 'View revenue and transaction reports',
      icon: TrendingUp,
      action: () => Alert.alert('Financial Reports', 'Financial reporting functionality will be implemented'),
    },
    {
      title: 'Wallet Management',
      description: 'Manage user wallets and transactions',
      icon: Wallet,
      action: () => Alert.alert('Wallet Management', 'Wallet management functionality will be implemented'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <Text style={styles.headerSubtitle}>Manage platform operations</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Users size={24} color={COLORS.primary} />
          <Text style={styles.statValue}>{stats.totalUsers}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color={COLORS.warning} />
          <Text style={styles.statValue}>{stats.pendingKYC}</Text>
          <Text style={styles.statLabel}>Pending KYC</Text>
        </View>
        <View style={styles.statCard}>
          <CheckCircle size={24} color={COLORS.success} />
          <Text style={styles.statValue}>{stats.activePartners}</Text>
          <Text style={styles.statLabel}>Active Partners</Text>
        </View>
        <View style={styles.statCard}>
          <Package size={24} color={COLORS.info} />
          <Text style={styles.statValue}>{stats.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
      </View>

      {/* Revenue Card */}
      <View style={styles.revenueCard}>
        <TrendingUp size={24} color={COLORS.success} />
        <View style={styles.revenueInfo}>
          <Text style={styles.revenueLabel}>Total Revenue</Text>
          <Text style={styles.revenueAmount}>₦{stats.totalRevenue.toLocaleString()}</Text>
        </View>
      </View>

      {/* Pending Verifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending KYC Verifications</Text>
        {pendingVerifications.length > 0 ? (
          pendingVerifications.map((doc: any) => (
            <View key={doc.id} style={styles.verificationCard}>
              <View style={styles.verificationHeader}>
                <View style={styles.verificationInfo}>
                  <Text style={styles.userName}>{doc.profiles?.full_name || 'Unknown User'}</Text>
                  <Text style={styles.userEmail}>{doc.profiles?.email}</Text>
                  <Text style={styles.documentType}>
                    {doc.document_type.replace('_', ' ').toUpperCase()}: {doc.document_number}
                  </Text>
                </View>
                <View style={styles.verificationActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleVerificationAction(doc.id, 'approve')}
                  >
                    <CheckCircle size={16} color={COLORS.text.primary} />
                    <Text style={styles.actionButtonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleVerificationAction(doc.id, 'reject')}
                  >
                    <XCircle size={16} color={COLORS.text.primary} />
                    <Text style={styles.actionButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noPending}>No pending verifications</Text>
        )}
      </View>

      {/* Admin Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Admin Actions</Text>
        <View style={styles.actionsGrid}>
          {adminActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={action.action}
              >
                <IconComponent size={24} color={COLORS.primary} />
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginRight: '4%',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  revenueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success + '20',
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  revenueInfo: {
    marginLeft: 16,
  },
  revenueLabel: {
    fontSize: 14,
    color: COLORS.success,
    marginBottom: 4,
  },
  revenueAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.success,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  verificationCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  verificationInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  documentType: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  verificationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  approveButton: {
    backgroundColor: COLORS.success,
  },
  rejectButton: {
    backgroundColor: COLORS.error,
  },
  actionButtonText: {
    color: COLORS.text.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  noPending: {
    textAlign: 'center',
    color: COLORS.text.secondary,
    fontSize: 14,
    paddingVertical: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});