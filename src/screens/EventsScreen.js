import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const CATEGORIES = ['All', 'Social', 'Environment', 'Disaster', 'Medical', 'Other'];

export const EventsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
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
        <View style={styles.typeTag}>
           <Text style={styles.typeText}>{item.category || 'Initiative'}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.locationRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={16} color="#94A3B8" />
          <Text style={styles.locationText}>{item.location || 'Chennai, India'}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.attendeesRow}>
            <View style={styles.avatarStack}>
               <AvatarGroup count={item.attendeesCount || 24} />
            </View>
            <Text style={styles.attendeesCount}>{item.attendeesCount || 24} Involved</Text>
          </View>
          <TouchableOpacity 
            style={styles.joinBtn}
            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
          >
            <Text style={styles.joinBtnText}>Join Initative</Text>
            <MaterialCommunityIcons name="chevron-right" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* INTEGRATED SINGLE-LAYER HEADER */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>Impact Hub</Text>
                <Text style={styles.headerSub}>Community initiatives & events</Text>
              </View>
              <TouchableOpacity style={styles.notifIconPill}>
                <MaterialCommunityIcons name="bell-outline" size={24} color="#1A1C1E" />
                <Badge size={8} style={styles.notifBadge} />
              </TouchableOpacity>
            </View>

            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBox}>
                <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
                <TextInput 
                  placeholder="Search events or locations..." 
                  style={styles.searchInput}
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* CATEGORY CHIPS */}
            <View style={styles.categoryWrapper}>
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
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator color="#1A1C1E" size="large" />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="calendar-remove-outline" size={60} color="#F1F5F9" />
              <Text style={styles.emptyText}>No Upcoming Events</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const AvatarGroup = ({ count }) => (
  <View style={{ flexDirection: 'row' }}>
     {[1, 2, 3].map(i => (
       <View key={i} style={[styles.miniAvatar, { marginLeft: i === 1 ? 0 : -10, zIndex: 10 - i }]}>
          <Image source={{ uri: `https://i.pravatar.cc/100?u=${i}` }} style={styles.miniAvatarImg} />
       </View>
     ))}
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 40, // Uniform Rhythm
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  notifIconPill: {
    width: 48,
    height: 48,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  notifBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#EF4444',
  },
  listContent: {
    paddingBottom: 100,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 40, // Uniform Rhythm
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    height: 60,
    borderRadius: 28,
    paddingHorizontal: 20,
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
  categoryWrapper: {
    marginBottom: 40, // Uniform Rhythm
  },
  categoryScroll: {
    paddingHorizontal: 24,
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
    marginTop: 100,
    alignItems: 'center',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35, // Premium Radius
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  cardHeader: {
    height: 180,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 20, // Grid Mesh Alignment
    left: 20, // Grid Mesh Alignment
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 18, // Premium Icon Box Radius
    width: 60,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '910',
    color: '#1A1C1E',
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '900',
    color: '#3B82F6',
    marginTop: 2,
  },
  typeTag: {
    position: 'absolute',
    top: 20, // Grid Mesh Alignment
    right: 20, // Grid Mesh Alignment
    backgroundColor: 'rgba(26,28,30,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 10,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '910',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardBody: {
    padding: 24, // Consistent Internal Padding
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24, // Unified Internal Padding
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  miniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
  },
  miniAvatarImg: {
    width: '100%',
    height: '100%',
  },
  attendeesCount: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748B',
  },
  joinBtn: {
    backgroundColor: '#1A1C1E',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18, // Standardized Button Radius
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '910',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    marginTop: 20,
    color: '#CBD5E1',
    fontWeight: '800',
    fontSize: 16,
  }
});
