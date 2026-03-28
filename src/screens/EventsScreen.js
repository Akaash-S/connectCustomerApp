import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Text, Card, Button, useTheme, ActivityIndicator, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

export const EventsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
      style={styles.eventCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.dateBadge}>
           <Text style={styles.dateDay}>{new Date(item.eventDate || Date.now()).getDate()}</Text>
           <Text style={styles.dateMonth}>{new Date(item.eventDate || Date.now()).toLocaleString('default', { month: 'short' }).toUpperCase()}</Text>
        </View>
        <Image 
          source={{ uri: item.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400' }} 
          style={styles.eventImage}
        />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.locationRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={16} color="#94A3B8" />
          <Text style={styles.locationText}>{item.location || 'Chennai'}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.attendeesRow}>
            <MaterialCommunityIcons name="account-group-outline" size={18} color="#6B7280" />
            <Text style={styles.attendeesCount}>{item.attendeesCount || 20} Joined</Text>
          </View>
          <Button 
            mode="contained" 
            style={styles.joinBtn}
            labelStyle={styles.joinBtnLabel}
            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
          >
            Join
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Impact Events</Text>
        <Text style={styles.headerSub}>Make a difference together</Text>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color="#1A1C1E" />
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="calendar-blank-outline" size={60} color="#F1F5F9" />
              <Text style={styles.emptyText}>No Data</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  headerSub: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
  },
  cardHeader: {
    position: 'relative',
    height: 180,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    width: 60,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dateDay: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B91C1C',
    textTransform: 'uppercase',
  },
  cardBody: {
    padding: 24,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attendeesCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '700',
  },
  joinBtn: {
    borderRadius: 18,
    backgroundColor: '#1A1C1E',
    paddingHorizontal: 8,
  },
  joinBtnLabel: {
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 20,
    color: '#94A3B8',
    fontWeight: '600',
  }
});
