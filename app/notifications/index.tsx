import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, MessageSquare, Package, CreditCard, AlertTriangle } from 'lucide-react-native';
import { COLORS } from '@/lib/constants';
import { useState } from 'react';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    bidUpdates: true,
    orderStatus: true,
    paymentUpdates: true,
    chatMessages: true,
    promotions: false,
    systemAlerts: true,
  });

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const notificationSettings = [
    {
      key: 'bidUpdates',
      title: 'Bid Updates',
      description: 'Get notified when partners bid on your orders',
      icon: Package,
    },
    {
      key: 'orderStatus',
      title: 'Order Status',
      description: 'Updates on delivery progress and completion',
      icon: Package,
    },
    {
      key: 'paymentUpdates',
      title: 'Payment Updates',
      description: 'Notifications about payments and wallet activity',
      icon: CreditCard,
    },
    {
      key: 'chatMessages',
      title: 'Chat Messages',
      description: 'New messages from partners and support',
      icon: MessageSquare,
    },
    {
      key: 'promotions',
      title: 'Promotions & Offers',
      description: 'Special deals and promotional offers',
      icon: Bell,
    },
    {
      key: 'systemAlerts',
      title: 'System Alerts',
      description: 'Important system notifications and updates',
      icon: AlertTriangle,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>Manage your notification preferences</Text>
      </View>

      <View style={styles.settingsContainer}>
        {notificationSettings.map((setting) => {
          const IconComponent = setting.icon;
          return (
            <View key={setting.key} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <IconComponent size={20} color={COLORS.primary} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
              </View>
              <Switch
                value={notifications[setting.key as keyof typeof notifications]}
                onValueChange={() => toggleNotification(setting.key)}
                trackColor={{ false: COLORS.background.border, true: COLORS.primaryLight }}
                thumbColor={notifications[setting.key as keyof typeof notifications] ? COLORS.primary : COLORS.text.secondary}
              />
            </View>
          );
        })}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Notifications</Text>
        <Text style={styles.infoText}>
          • Push notifications will be sent to your device{'\n'}
          • You can disable notifications at any time{'\n'}
          • Critical system alerts cannot be disabled{'\n'}
          • Notification preferences are saved automatically
        </Text>
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
  settingsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  infoContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
});