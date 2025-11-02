import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingUp, Clock, Users, Zap } from 'lucide-react-native';
import { COLORS } from '@/lib/constants';

export default function EnhancedBiddingScreen() {
  const router = useRouter();

  const biddingFeatures = [
    {
      title: 'Real-time Competitive Bidding',
      description: 'Partners compete in real-time with live bid updates',
      icon: TrendingUp,
      features: [
        'Live bid feed',
        'Instant notifications',
        'Competitive pricing',
        'Time-limited auctions'
      ]
    },
    {
      title: 'Auto-Accept Thresholds',
      description: 'Automatically accept bids below your price threshold',
      icon: Zap,
      features: [
        'Set minimum acceptable price',
        'Instant partner assignment',
        'No manual bid review needed',
        'Faster delivery matching'
      ]
    },
    {
      title: 'Smart Bid Decrement',
      description: 'Minimum bid reduction ensures fair competition',
      icon: Users,
      features: [
        'Configurable decrement amounts',
        'Prevents bid manipulation',
        'Fair competition',
        'Market-driven pricing'
      ]
    },
    {
      title: 'Bid Expiry & Management',
      description: 'Time-sensitive bidding with automatic expiry',
      icon: Clock,
      features: [
        'Configurable bidding windows',
        'Automatic bid closure',
        'Expiry notifications',
        'Bid history tracking'
      ]
    }
  ];

  const handleFeaturePress = (feature: string) => {
    Alert.alert('Feature Preview', `${feature} functionality will be implemented with real-time bidding system`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enhanced Bidding System</Text>
        <Text style={styles.headerSubtitle}>inDrive-style competitive bidding</Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Real-Time Competitive Bidding</Text>
        <Text style={styles.heroDescription}>
          Experience the power of inDrive-style bidding where partners compete in real-time
          to offer you the best prices for your delivery needs.
        </Text>
        <TouchableOpacity style={styles.heroButton} onPress={() => handleFeaturePress('Real-time bidding')}>
          <Text style={styles.heroButtonText}>Try Enhanced Bidding</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Key Features</Text>

        {biddingFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={() => handleFeaturePress(feature.title)}
            >
              <View style={styles.featureHeader}>
                <View style={styles.featureIcon}>
                  <IconComponent size={24} color={COLORS.primary} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>

              <View style={styles.featureList}>
                {feature.features.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.featureItem}>
                    <Text style={styles.featureBullet}>•</Text>
                    <Text style={styles.featureItemText}>{item}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.workflowContainer}>
        <Text style={styles.sectionTitle}>How It Works</Text>

        <View style={styles.workflowSteps}>
          <View style={styles.workflowStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Create Order</Text>
              <Text style={styles.stepDescription}>Set your budget and auto-accept threshold</Text>
            </View>
          </View>

          <View style={styles.workflowStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Live Bidding</Text>
              <Text style={styles.stepDescription}>Partners compete with real-time bid updates</Text>
            </View>
          </View>

          <View style={styles.workflowStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Auto-Accept</Text>
              <Text style={styles.stepDescription}>Best bids accepted automatically</Text>
            </View>
          </View>

          <View style={styles.workflowStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Instant Delivery</Text>
              <Text style={styles.stepDescription}>Partner assigned and delivery begins</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={styles.sectionTitle}>Benefits</Text>

        <View style={styles.benefitsGrid}>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>💰 Better Prices</Text>
            <Text style={styles.benefitDescription}>Competitive bidding drives down costs</Text>
          </View>

          <View style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>⚡ Faster Matching</Text>
            <Text style={styles.benefitDescription}>Auto-accept thresholds speed up delivery</Text>
          </View>

          <View style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>🎯 Quality Partners</Text>
            <Text style={styles.benefitDescription}>Best partners win through competition</Text>
          </View>

          <View style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>📱 Real-Time Updates</Text>
            <Text style={styles.benefitDescription}>Live notifications and bid tracking</Text>
          </View>
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
  heroCard: {
    marginHorizontal: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: COLORS.text.primary,
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  featuresContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  featureList: {
    paddingLeft: 64,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureBullet: {
    fontSize: 16,
    color: COLORS.primary,
    marginRight: 8,
  },
  featureItemText: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  workflowContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  workflowSteps: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  workflowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  benefitsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefitCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 16,
  },
});