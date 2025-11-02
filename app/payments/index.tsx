import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CreditCard, Plus, Banknote, Smartphone } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    if (!profile) return;

    try {
      const { data: methods } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', profile.id)
        .order('is_default', { ascending: false });

      if (methods) {
        setPaymentMethods(methods);
      }
    } catch (error) {
      console.error('Error loading payment methods:', error);
    }
  };

  const handleAddCard = () => {
    Alert.alert('Add Card', 'Card addition functionality will be implemented');
  };

  const handleAddBankAccount = () => {
    Alert.alert('Add Bank Account', 'Bank account addition functionality will be implemented');
  };

  const maskAccountNumber = (number: string) => {
    if (number.length <= 4) return number;
    return '•••• •••• •••• ' + number.slice(-4);
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard size={24} color={COLORS.primary} />;
      case 'bank':
        return <Banknote size={24} color={COLORS.primary} />;
      case 'wallet':
        return <Smartphone size={24} color={COLORS.primary} />;
      default:
        return <CreditCard size={24} color={COLORS.primary} />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <Text style={styles.headerSubtitle}>Manage your payment options</Text>
      </View>

      {/* Add Payment Method Options */}
      <View style={styles.addMethodsSection}>
        <Text style={styles.sectionTitle}>Add Payment Method</Text>
        <View style={styles.addMethodsGrid}>
          <TouchableOpacity style={styles.addMethodCard} onPress={handleAddCard}>
            <CreditCard size={32} color={COLORS.primary} />
            <Text style={styles.addMethodText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addMethodCard} onPress={handleAddBankAccount}>
            <Banknote size={32} color={COLORS.primary} />
            <Text style={styles.addMethodText}>Bank Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Existing Payment Methods */}
      <View style={styles.existingMethodsSection}>
        <Text style={styles.sectionTitle}>Your Payment Methods</Text>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method: any) => (
            <View key={method.id} style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodHeader}>
                {getPaymentMethodIcon(method.type)}
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>
                    {method.account_name || method.provider}
                  </Text>
                  <Text style={styles.paymentMethodNumber}>
                    {maskAccountNumber(method.account_number)}
                  </Text>
                </View>
                {method.is_default && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>
              <View style={styles.paymentMethodActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noMethodsContainer}>
            <Text style={styles.noMethodsText}>No payment methods added yet</Text>
            <Text style={styles.noMethodsSubtext}>
              Add a payment method to make transactions easier
            </Text>
          </View>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  addMethodsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  addMethodsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  addMethodCard: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    borderStyle: 'dashed',
  },
  addMethodText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginTop: 12,
    textAlign: 'center',
  },
  existingMethodsSection: {
    paddingHorizontal: 24,
  },
  paymentMethodCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentMethodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  paymentMethodNumber: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  defaultBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultBadgeText: {
    color: COLORS.text.primary,
    fontSize: 10,
    fontWeight: '600',
  },
  paymentMethodActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.text.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  noMethodsContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  noMethodsText: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  noMethodsSubtext: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});