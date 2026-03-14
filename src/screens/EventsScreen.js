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

const MeshBackground = () => (
  <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF7ED' }]}>
    <View style={[styles.blob, { top: -100, left: -50, backgroundColor: 'rgba(249, 115, 22, 0.08)', width: 350, height: 350 }]} />
    <View style={[styles.blob, { bottom: 200, right: -100, backgroundColor: 'rgba(236, 72, 153, 0.05)', width: 450, height: 450 }]} />
  </View>
);

export const EventsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const renderFeaturedEvent = ({ item }) => (
    <Card style={styles.featuredGlassCard} onPress={() => navigation.navigate('EventDetails')} activeOpacity={1}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.glassOverlay}>
        <View style={styles.dateBadgeFloat}>
          <Text style={styles.dateBadgeText}>{item.date.split(' ')[0]}</Text>
          <Text style={styles.dateBadgeMonth}>{item.date.split(' ')[1]}</Text>
        </View>

        <View style={styles.featuredBottomInfo}>
          <Text variant="titleLarge" style={styles.featuredTitle}>{item.title}</Text>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="office-building" size={14} color="#BBB" />
            <Text style={styles.featuredNgo}>{item.ngo}</Text>
          </View>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="map-marker" size={14} color="#BBB" />
            <Text style={styles.featuredLocation}>{item.location}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderUpcomingEvent = ({ item }) => (
    <Card style={styles.upcomingGlassCard} onPress={() => navigation.navigate('EventDetails')} activeOpacity={1}>
      <View style={styles.upcomingContent}>
        <Text variant="titleMedium" style={styles.upcomingTitle}>{item.title}</Text>
        <Text variant="bodySmall" style={styles.upcomingMeta}>📅 {item.date} • 📍 {item.location}</Text>
        <View style={styles.volunteersBadge}>
          <MaterialCommunityIcons name="account-group" size={14} color="#D97706" />
          <Text style={styles.volunteersText}>{item.volunteersNeeded} Needed</Text>
        </View>
        <Button mode="contained-tonal" compact style={styles.joinBtn}>Details</Button>
      </View>
    </Card>
  );

  const renderNearbyEvent = ({ item }) => (
    <Card style={styles.nearbyGlassCard} onPress={() => navigation.navigate('EventDetails')} activeOpacity={1}>
      <View style={styles.nearbyContent}>
        <Text variant="titleMedium" numberOfLines={1} style={styles.nearbyTitle}>{item.title}</Text>
        <Text variant="bodySmall" style={styles.nearbyMeta}>📍 {item.distance} • 📅 {item.date}</Text>
        <Button mode="text" style={styles.viewBtn} labelStyle={{ fontSize: 12, color: '#D97706' }}>View Details</Button>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <MeshBackground />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text variant="displaySmall" style={styles.headerTitle}>Find Events</Text>
            <Text variant="bodyLarge" style={styles.headerSub}>Find causes to support today</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.glassSearchWrapper}>
            <MaterialCommunityIcons name="magnify" size={24} color="#6B7280" />
            <Searchbar
              placeholder="Search events, workshops..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.glassSearchBar}
              elevation={0}
              placeholderTextColor="#9CA3AF"
              inputStyle={styles.searchInput}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(activeCategory === cat ? null : cat)}
              style={[
                styles.glassCategoryChip,
                activeCategory === cat && styles.activeCategoryChip
              ]}
            >
              <Text style={[
                styles.categoryChipText,
                activeCategory === cat && styles.activeCategoryText
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Events */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Featured Experience</Text>
        </View>
        <FlatList
          horizontal
          data={FEATURED_EVENTS}
          renderItem={renderFeaturedEvent}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Happening Soon</Text>
        </View>
        <FlatList
          horizontal
          data={UPCOMING_EVENTS}
          renderItem={renderUpcomingEvent}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* All Events List */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Explore All Causes</Text>
        </View>
        <View style={styles.listContainer}>
          {ALL_EVENTS.map(event => (
            <Card key={event.id} style={styles.listGlassCard} onPress={() => navigation.navigate('EventDetails')} activeOpacity={1}>
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
                  <Text variant="bodySmall" style={styles.listNgoText}>{event.ngo}</Text>

                  <View style={styles.progressSection}>
                    <View style={styles.progressRow}>
                      <Text style={styles.progressLabel}>{event.joined} joined</Text>
                      <Text style={styles.progressLabel}>{event.total} max</Text>
                    </View>
                    <ProgressBar progress={event.joined / event.total} color="#F97316" style={styles.premiumProgress} />
                  </View>

                  <Button
                    mode="contained"
                    buttonColor="#1A1C1E"
                    compact
                    style={styles.viewEventBtn}
                    labelStyle={{ fontSize: 10, color: '#FFF' }}
                  >
                    Join Now
                  </Button>
                </View>
              </View>
            </Card>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blob: {
    position: 'absolute',
    borderRadius: 300,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  headerSub: {
    color: '#6B7280',
    marginTop: 4,
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  glassSearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  glassSearchBar: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
  },
  searchInput: {
    fontSize: 15,
  },
  categoryScroll: {
    paddingLeft: 24,
    paddingBottom: 20,
  },
  glassCategoryChip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  activeCategoryChip: {
    backgroundColor: '#1A1C1E',
  },
  categoryChipText: {
    fontWeight: '700',
    color: '#4B5563',
  },
  activeCategoryText: {
    color: '#FFF',
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  horizontalList: {
    paddingLeft: 24,
    paddingBottom: 24,
  },
  featuredGlassCard: {
    width: 320,
    height: 420,
    marginRight: 20,
    borderRadius: 36,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 10,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 28,
    justifyContent: 'space-between',
  },
  dateBadgeFloat: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignItems: 'center',
  },
  dateBadgeText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  dateBadgeMonth: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F97316',
    textTransform: 'uppercase',
  },
  featuredBottomInfo: {
    // Gap handled by space-between
  },
  featuredTitle: {
    color: '#FFF',
    fontWeight: '900',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  featuredNgo: {
    color: '#BBB',
    fontWeight: '600',
  },
  featuredLocation: {
    color: '#BBB',
  },
  upcomingGlassCard: {
    width: 250,
    marginRight: 20,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  upcomingTitle: {
    fontWeight: '900',
    fontSize: 16,
    color: '#1A1C1E',
  },
  upcomingMeta: {
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 12,
  },
  volunteersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  volunteersText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
  },
  nearbyGlassCard: {
    width: 210,
    marginRight: 18,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  nearbyTitle: {
    fontWeight: '800',
    color: '#1A1C1E',
  },
  nearbyMeta: {
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  listGlassCard: {
    marginBottom: 20,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  listCardContent: {
    flexDirection: 'row',
    height: 160,
  },
  listImageContainer: {
    width: '35%',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#D97706',
  },
  listTextContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  listTitle: {
    fontWeight: '900',
    fontSize: 15,
    color: '#1A1C1E',
  },
  listNgoText: {
    color: '#D97706',
    fontWeight: '800',
    fontSize: 11,
    marginTop: -4,
  },
  progressSection: {
    marginTop: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  premiumProgress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  viewEventBtn: {
    borderRadius: 10,
    marginTop: 8,
    height: 32,
    justifyContent: 'center',
  }
});
