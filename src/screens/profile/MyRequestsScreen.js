import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, useTheme, Surface, Chip } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const RequestsData = [
  { id: '1', title: 'Tree Plantation Volunteers Needed', location: 'Chennai', date: '22 March', status: 'Pending', type: 'Environment' },
  { id: '2', title: 'Beach Cleanup Drive', location: 'Marina Beach', date: '25 March', status: 'Volunteer Assigned', type: 'Environment' },
  { id: '3', title: 'Old Age Home Support', location: 'Adyar', date: '28 March', status: 'In Progress', type: 'Social' },
  { id: '4', title: 'Park Restoration', location: 'Velachery', date: '10 March', status: 'Completed', type: 'Environment' },
];

const RequestCard = ({ item }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#F59E0B';
      case 'Volunteer Assigned': return '#3B82F6';
      case 'In Progress': return '#8B5CF6';
      case 'Completed': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <Surface style={styles.card} elevation={2}>
      <View style={styles.cardHeader}>
        <Chip icon="leaf" style={styles.typeChip} textStyle={styles.typeChipText}>{item.type}</Chip>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      
      <Text variant="titleMedium" style={styles.title}>{item.title}</Text>
      
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons name="map-marker-outline" size={16} color="#6B7280" />
          <Text style={styles.footerText}>{item.location}</Text>
        </View>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.footerText}>{item.date}</Text>
        </View>
      </View>
    </Surface>
  );
};

export const MyRequestsScreen = ({ navigation }) => {
  return (
    <ProfileSubScreenWrapper title="My Requests" navigation={navigation}>
      <View style={styles.container}>
        {RequestsData.map(item => (
          <RequestCard key={item.id} item={item} />
        ))}
      </View>
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeChip: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    height: 28,
  },
  typeChipText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#10B981',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    gap: 15,
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
    paddingTop: 15,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  }
});
