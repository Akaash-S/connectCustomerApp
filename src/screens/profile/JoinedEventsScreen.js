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
          {/* SEARCH SECTION */}
          <View style={styles.searchSection}>
            <View style={styles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
              <TextInput 
                placeholder="Search joined events..." 
                style={styles.searchInput}
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* CATEGORY SECTION */}
          <View style={styles.categorySection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.categoryScroll}
            >
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
              scrollEnabled={false} // Managed by Wrapper ScrollView
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons name="calendar-blank-outline" size={60} color="#F1F5F9" />
                  <Text style={styles.emptyText}>No events found</Text>
                </View>
              }
            />
          )}

          <View style={{ height: 40 }} />
        </ProfileSubScreenWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchSection: {
    marginBottom: 40, // Master Rhythm Spacing
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 28,
    paddingHorizontal: 20,
    height: 60,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  categorySection: {
    marginBottom: 40, // Master Rhythm
  },
  categoryScroll: {
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  activeChip: {
    backgroundColor: '#1A1C1E',
    borderColor: '#1A1C1E',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#64748B',
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
    borderRadius: 35, // Premium Radius
    padding: 24, // Consistent Internal Padding
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ngoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18, // Master Icon Box Radius
    backgroundColor: '#1A1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '910',
  },
  ngoName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#94A3B8',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18, // Master Icon Box Radius
  },
  statusText: {
    fontSize: 10,
    fontWeight: '910',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '910',
    color: '#1A1C1E',
    marginBottom: 24,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  details: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 24, // Unified Internal Padding
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
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 20,
    color: '#94A3B8',
    fontWeight: '800',
    fontSize: 16,
  }
});
