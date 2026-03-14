import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const NotificationEmptyState = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name="bell-off-outline" size={60} color="#D1D5DB" />
      </View>
      <Text variant="titleLarge" style={styles.title}>No Notifications Yet</Text>
      <Text style={styles.subtitle}>
        You will receive updates about requests, events, and NGO activities.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: '900',
    color: '#1A1C1E',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
    fontWeight: '500',
  },
});
