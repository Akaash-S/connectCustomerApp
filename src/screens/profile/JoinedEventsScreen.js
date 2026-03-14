import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface, Avatar } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const EventsData = [
  { id: '1', title: 'Beach Cleanup Drive', date: '25 March', location: 'Marina Beach', status: 'Upcoming', ngo: 'Ocean Guardians' },
  { id: '2', title: 'Primary School Mentoring', date: '15 March', location: 'Kandanchavadi', status: 'Attended', ngo: 'EduCare India' },
];

const EventCard = ({ item }) => {
  const isCompleted = item.status === 'Attended';
  
  return (
    <Surface style={styles.card} elevation={2}>
      <View style={styles.cardHeader}>
        <View style={styles.ngoInfo}>
          <Avatar.Text size={32} label={item.ngo[0]} style={{ backgroundColor: '#D97706' }} labelStyle={{ fontSize: 14, fontWeight: 'bold' }} />
          <Text style={styles.ngoName}>{item.ngo}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: isCompleted ? '#10B98120' : '#D9770620' }]}>
          <Text style={[styles.statusText, { color: isCompleted ? '#10B981' : '#D97706' }]}>{item.status}</Text>
        </View>
      </View>

      <Text variant="titleMedium" style={styles.title}>{item.title}</Text>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
      </View>
    </Surface>
  );
};

export const JoinedEventsScreen = ({ navigation }) => {
  return (
    <ProfileSubScreenWrapper title="Joined Events" navigation={navigation}>
      <View style={styles.container}>
        {EventsData.map(item => (
          <EventCard key={item.id} item={item} />
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
    marginBottom: 15,
  },
  ngoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ngoName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#374151',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 15,
  },
  details: {
    flexDirection: 'row',
    gap: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  }
});
