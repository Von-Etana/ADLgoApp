import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Navigation, Search } from 'lucide-react-native';
import { COLORS } from '@/lib/constants';

export default function MapsScreen() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = () => {
    Alert.alert('Google Maps Integration', 'Google Maps integration will be implemented with location selection and tracking features');
  };

  const handleRouteOptimization = () => {
    Alert.alert('Route Optimization', 'Route optimization and distance calculation will be implemented');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Location Services</Text>
        <Text style={styles.headerSubtitle}>Google Maps Integration</Text>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color={COLORS.primary} />
          <Text style={styles.mapPlaceholderText}>Google Maps View</Text>
          <Text style={styles.mapPlaceholderSubtext}>Interactive map will be displayed here</Text>
        </View>
      </View>

      {/* Location Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleLocationSelect}>
          <Search size={24} color={COLORS.text.primary} />
          <View style={styles.controlText}>
            <Text style={styles.controlTitle}>Select Location</Text>
            <Text style={styles.controlSubtitle}>Pick pickup/dropoff points</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleRouteOptimization}>
          <Navigation size={24} color={COLORS.text.primary} />
          <View style={styles.controlText}>
            <Text style={styles.controlTitle}>Route Optimization</Text>
            <Text style={styles.controlSubtitle}>Calculate best delivery routes</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Features List */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Map Features</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>• Real-time location tracking</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>• Distance calculation</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>• Route optimization</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>• Address autocomplete</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>• GPS navigation</Text>
          </View>
        </View>
      </View>
    </View>
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
  mapContainer: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.background.secondary,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  mapPlaceholderText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  controlsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  controlText: {
    marginLeft: 16,
    flex: 1,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  controlSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  featuresContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  featuresList: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
});