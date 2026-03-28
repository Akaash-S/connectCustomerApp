import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, StatusBar, TextInput, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../../services/api';

const CATEGORIES = ['All', 'Upcoming', 'Past'];

export const JoinedEventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const data = await api.getJoinedEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching joined events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJoinedEvents();
  }, []);

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isPast = new Date(e.eventDate) < new Date();
    if (activeCategory === 'Upcoming') return matchesSearch && !isPast;
    if (activeCategory === 'Past') return matchesSearch && isPast;
    return matchesSearch;
  });

  const renderEventItem = ({ item }) => {
    const isPast = new Date(item.eventDate) < new Date();
    
    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <View style={styles.ngoInfo}>
            <View style={styles.avatarCircle}>
               <Text style={styles.avatarText}>{item.ngoName ? item.ngoName[0] : 'E'}</Text>
            </View>
            <Text style={styles.ngoName}>{item.ngoName || 'Verified NGO'}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: isPast ? '#F0FDF4' : '#FFFBEB' }]}>
            <Text style={[styles.statusText, { color: isPast ? '#10B981' : '#D97706' }]}>
              {isPast ? 'Attended' : 'Upcoming'}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="calendar-month-outline" size={16} color="#94A3B8" />
            <Text style={styles.detailText}>{new Date(item.eventDate || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={16} color="#94A3B8" />
            <Text style={styles.detailText} numberOfLines={1}>{item.location || 'Chennai'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
       <ProfileSubScreenWrapper 
          title="Joined Events" 
          subtitle="Impact events you joined" 
          navigation={navigation}
        >
          {/* SEARCH BAR (HUB CONSISTENT) */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
              <TextInput 
                placeholder="Search your joined events..." 
                style={styles.searchInput}
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* CATEGORY CHIPS */}
          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity 
                  key={cat} 
                  style={[styles.categoryChip, activeCategory === cat && styles.activeChip]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text style={[styles.chipText, activeCategory === cat && styles.activeChipText]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator color="#1A1C1E" />
            </View>
          ) : (
            <FlatList
              data={filteredEvents}
              renderItem={renderEventItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Since it's inside ScrollView of Wrapper
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons name="calendar-blank-outline" size={60} color="#F1F5F9" />
                  <Text style={styles.emptyText}>No Data</Text>
                </View>
              }
            />
          )}
        </ProfileSubScreenWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 28,
    paddingHorizontal: 20,
    height: 56,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  categoryContainer: {
    marginBottom: 25,
  },
  categoryScroll: {
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  activeChip: {
    backgroundColor: '#1A1C1E',
    borderColor: '#1A1C1E',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  loader: {
    padding: 100,
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
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
    gap: 12,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  ngoName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#94A3B8',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 15,
    lineHeight: 24,
  },
  details: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#1A1C1E',
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    marginTop: 20,
    color: '#94A3B8',
    fontWeight: '800',
    fontSize: 16,
  }
});
