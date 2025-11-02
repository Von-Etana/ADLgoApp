import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Wallet, Plus, History, CreditCard, Banknote } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function WalletScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    if (!profile) return;

    try {
      // Load wallet balance
      const { data: wallet } = await supabase
        .from('user_wallets')
        .select('balance')
        .eq('user_id', profile.id)
        .single();

      if (wallet) {
        setBalance(wallet.balance);
      }

      // Load recent transactions
      const { data: txns } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (txns) {
        setTransactions(txns);
      }
    } catch (error) {
      console.error('Error loading wallet data:', error);
    }
  };

  const handleAddMoney = () => {
    // Navigate to add money screen (to be implemented)
    Alert.alert('Add Money', 'Add money functionality will be implemented');
  };

  const handleViewHistory = () => {
    router.push('/wallet/history');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wallet</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Wallet size={32} color={COLORS.primary} />
          <Text style={styles.balanceLabel}>Available Balance</Text>
        </View>
        <Text style={styles.balanceAmount}>₦{balance.toLocaleString()}</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddMoney}>
            <Plus size={20} color={COLORS.text.primary} />
            <Text style={styles.actionButtonText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleViewHistory}>
            <History size={20} color={COLORS.text.primary} />
            <Text style={styles.actionButtonText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionCard}>
            <CreditCard size={24} color={COLORS.primary} />
            <Text style={styles.quickActionText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard}>
            <Banknote size={24} color={COLORS.primary} />
            <Text style={styles.quickActionText}>Bank Transfer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {transactions.length > 0 ? (
          transactions.map((txn: any) => (
            <View key={txn.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>{txn.description}</Text>
                <Text style={styles.transactionDate}>
                  {new Date(txn.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                txn.type === 'credit' ? styles.creditAmount : styles.debitAmount
              ]}>
                {txn.type === 'credit' ? '+' : '-'}₦{txn.amount.toLocaleString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactions}>No transactions yet</Text>
        )}
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
  },
  balanceCard: {
    marginHorizontal: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginLeft: 12,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.border,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  creditAmount: {
    color: COLORS.success,
  },
  debitAmount: {
    color: COLORS.error,
  },
  noTransactions: {
    textAlign: 'center',
    color: COLORS.text.secondary,
    fontSize: 14,
    paddingVertical: 24,
  },
});