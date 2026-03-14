import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const StatCard = ({ label, value, icon, color, onPress }) => (
  <TouchableOpacity 
    style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 4 }]} 
    onPress={onPress}
    activeOpacity={1}
  >
    <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
);

export const ProfileStats = ({ stats, onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionHeader}>Activity & Participation</Text>
      <View style={styles.statsGrid}>
        <StatCard 
          label="Requests" 
          value={stats.requestsCreated || 0} 
          icon="clipboard-plus-outline" 
          color="#3B82F6" 
          onPress={() => onNavigate('MyRequests')}
        />
        <StatCard 
          label="Joined" 
          value={stats.eventsJoined || 0} 
          icon="calendar-check-outline" 
          color="#10B981" 
          onPress={() => onNavigate('JoinedEvents')}
        />
        <StatCard 
          label="Completed" 
          value={stats.completedRequests || 0} 
          icon="check-circle-outline" 
          color="#F59E0B" 
          onPress={() => onNavigate('MyRequests')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 15,
    marginLeft: 4,
    letterSpacing: -0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 15,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginTop: 2,
    letterSpacing: 0.5,
  }
});
