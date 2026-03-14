import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, Searchbar, Card, Avatar, Button, useTheme, IconButton, Chip, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const FEATURED_EVENTS = [
  { 
    id: '1', 
    title: 'Beach Cleanup Drive', 
    ngo: 'Green Earth NGO', 
    date: '25 March', 
    location: 'Marina Beach', 
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600' 
  },
  { 
    id: '2', 
    title: 'Food Donation Camp', 
    ngo: 'Hope Sanctuary', 
    date: '28 March', 
    location: 'Central Park', 
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600' 
  },
];

const UPCOMING_EVENTS = [
  { id: '1', title: 'Tree Plantation Drive', date: 'Tomorrow', location: 'Chennai', volunteersNeeded: '45' },
  { id: '2', title: 'Old Age Home Visit', date: 'Sunday', location: 'Green View', volunteersNeeded: '12' },
];

const NEARBY_EVENTS = [
  { id: '1', title: 'Blood Donation Camp', distance: '2.1 km away', date: 'Sunday' },
  { id: '2', title: 'Street Play for Awareness', distance: '3.5 km away', date: 'Saturday' },
];

const CATEGORIES = ['Environment', 'Education', 'Health', 'Social', 'Animal Welfare', 'Disaster Relief'];

const ALL_EVENTS = [
  { 
    id: '1', 
    title: 'Plastic Free Marina', 
    ngo: 'Ocean Life', 
    date: '30 March', 
    location: 'Chennai', 
    joined: 25, 
    total: 50, 
    popular: true, 
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400' 
  },
  { 
    id: '2', 
    title: 'Evening Classes for Kids', 
    ngo: 'Helping Hands', 
    date: '02 April', 
    location: 'Velachery', 
    joined: 12, 
    total: 20, 
    popular: false, 
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400' 
  },
];

export const EventsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const renderFeaturedEvent = ({ item }) => (
    <Card style={styles.featuredCard} onPress={() => navigation.navigate('EventDetails')}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredInfo}>
          <Text variant="headlineSmall" style={styles.featuredTitle}>{item.title}</Text>
          <Text variant="titleSmall" style={styles.featuredNgo}>{item.ngo}</Text>
          <View style={styles.featuredMetaRow}>
            <MaterialCommunityIcons name="calendar" size={16} color="#FFF" />
            <Text style={styles.featuredMetaText}>{item.date}</Text>
            <MaterialCommunityIcons name="map-marker" size={16} color="#FFF" style={{ marginLeft: 15 }} />
            <Text style={styles.featuredMetaText}>{item.location}</Text>
          </View>
        </View>
        <Button mode="contained" buttonColor={theme.colors.secondary} style={styles.featuredBtn}>View Event</Button>
      </View>
    </Card>
  );

  const renderUpcomingEvent = ({ item }) => (
    <Card style={styles.upcomingCard} onPress={() => navigation.navigate('EventDetails')}>
      <View style={styles.upcomingContent}>
        <Text variant="titleMedium" style={styles.upcomingTitle}>{item.title}</Text>
        <Text variant="bodySmall" style={styles.upcomingMeta}>📅 {item.date} | 📍 {item.location}</Text>
        <Text variant="labelSmall" style={{ color: theme.colors.primary, marginVertical: 8 }}>{item.volunteersNeeded} Volunteers Needed</Text>
        <Button mode="contained" compact style={styles.joinBtn}>View Event</Button>
      </View>
    </Card>
  );

  const renderNearbyEvent = ({ item }) => (
    <Card style={styles.nearbyCard} onPress={() => navigation.navigate('EventDetails')}>
      <View style={styles.nearbyContent}>
        <Text variant="titleMedium" numberOfLines={1}>{item.title}</Text>
        <Text variant="bodySmall" style={styles.nearbyMeta}>📍 {item.distance} | 📅 {item.date}</Text>
        <Button mode="outlined" style={styles.viewBtn} labelStyle={{ fontSize: 12 }}>View Details</Button>
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header & Search Section */}
      <View style={styles.header}>
        <View>
          <Text variant="displaySmall" style={styles.headerTitle}>Find Events</Text>
          <Text variant="bodyMedium" style={styles.headerSub}>Join causes that cross your path</Text>
        </View>
        <IconButton 
          icon="bell-outline" 
          size={24} 
          style={styles.headerBtn} 
          containerColor="#FFF"
        />
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchWrapper}>
          <Searchbar
            placeholder="Search events, causes..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            elevation={0}
            inputStyle={styles.searchInput}
          />
          <TouchableOpacity 
            activeOpacity={1} 
            style={[styles.filterBtn, { backgroundColor: theme.colors.secondary }]}
          >
            <MaterialCommunityIcons name="tune-vertical" color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Featured Events */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>⭐ Featured Events</Text>
      </View>
      <FlatList
        horizontal
        data={FEATURED_EVENTS}
        renderItem={renderFeaturedEvent}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* 3. Upcoming Events */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>📅 Upcoming Events</Text>
      </View>
      <FlatList
        horizontal
        data={UPCOMING_EVENTS}
        renderItem={renderUpcomingEvent}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* 4. Nearby Events */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>📍 Events Near You</Text>
      </View>
      <FlatList
        horizontal
        data={NEARBY_EVENTS}
        renderItem={renderNearbyEvent}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* 5. Event Categories */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Categories</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {CATEGORIES.map(cat => (
          <Chip
            key={cat}
            selected={activeCategory === cat}
            onPress={() => setActiveCategory(activeCategory === cat ? null : cat)}
            style={[styles.categoryChip, activeCategory === cat && { backgroundColor: theme.colors.primary }]}
            textStyle={[styles.categoryChipText, activeCategory === cat && { color: '#FFF' }]}
          >
            {cat}
          </Chip>
        ))}
      </ScrollView>

      {/* 6. All Events List */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>All Events</Text>
      </View>
      <View style={styles.listContainer}>
        {ALL_EVENTS.map(event => (
          <Card key={event.id} style={styles.listCard} onPress={() => navigation.navigate('EventDetails')}>
            <View style={styles.listCardContent}>
              <View style={styles.listImageContainer}>
                <Image source={{ uri: event.image }} style={styles.listImage} />
                {event.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>🔥 Popular</Text>
                  </View>
                )}
              </View>
              <View style={styles.listTextContent}>
                <Text variant="titleMedium" style={styles.listTitle}>{event.title}</Text>
                <Text variant="bodySmall" style={styles.listNgo}>{event.ngo}</Text>
                <Text variant="labelSmall" style={styles.listMeta}>📅 {event.date} | 📍 {event.location}</Text>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>👥 {event.joined} / {event.total} Joined</Text>
                  </View>
                  <ProgressBar progress={event.joined / event.total} color={theme.colors.primary} style={styles.progressBar} />
                </View>

                <Button 
                  mode="contained-tonal" 
                  compact 
                  onPress={() => navigation.navigate('EventDetails')}
                  style={styles.listActionBtn}
                  labelStyle={styles.listActionLabel}
                >
                  View Event
                </Button>
              </View>
            </View>
          </Card>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  headerSub: {
    color: '#6B7280',
    marginTop: -2,
  },
  headerBtn: {
    margin: 0,
    marginTop: 5,
    elevation: 2,
    borderRadius: 12,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    height: 54,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    fontSize: 15,
  },
  filterBtn: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
    fontSize: 20,
  },
  horizontalList: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  featuredCard: {
    width: 320,
    height: 420,
    marginRight: 20,
    borderRadius: 36,
    overflow: 'hidden',
    elevation: 10,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 28,
    justifyContent: 'flex-end',
  },
  featuredInfo: {
    marginBottom: 20,
  },
  featuredTitle: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 28,
  },
  featuredNgo: {
    color: '#BBF7D0',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  featuredMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  featuredMetaText: {
    color: '#F3F4F6',
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
  },
  featuredBtn: {
    borderRadius: 18,
    height: 54,
    justifyContent: 'center',
  },
  upcomingCard: {
    width: 220,
    marginRight: 15,
    borderRadius: 24,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  upcomingContent: {
    padding: 16,
  },
  upcomingTitle: {
    fontWeight: '900',
    fontSize: 16,
  },
  upcomingMeta: {
    color: '#6B7280',
    marginTop: 4,
  },
  joinBtn: {
    borderRadius: 12,
  },
  nearbyCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 24,
    backgroundColor: '#FFF',
    elevation: 2,
    padding: 16,
  },
  nearbyMeta: {
    color: '#6B7280',
    marginVertical: 6,
  },
  viewBtn: {
    borderRadius: 12,
  },
  categoryScroll: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  categoryChip: {
    marginRight: 10,
    borderRadius: 14,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  categoryChipText: {
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  listCard: {
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: '#FFF',
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  listCardContent: {
    flexDirection: 'row',
    height: 155, // Increased from 140 to prevent clipping
  },
  listImageContainer: {
    width: '35%',
    position: 'relative',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    elevation: 2,
  },
  popularText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#D97706',
  },
  listTextContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  listTitle: {
    fontWeight: '900',
    fontSize: 15,
    color: '#1A1C1E',
  },
  listNgo: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: -2,
  },
  listMeta: {
    color: '#6B7280',
    fontSize: 10,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  progressLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  listActionBtn: {
    borderRadius: 10,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  listActionLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  }
});
