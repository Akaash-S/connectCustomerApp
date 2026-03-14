import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, Searchbar, Card, Avatar, Button, useTheme, IconButton, Chip } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const FEATURED_NGOS = [
  { id: '1', name: 'Green Earth Foundation', category: 'Environment', location: 'Chennai', volunteers: '1200', projects: '45', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500' },
  { id: '2', name: 'Hope Sanctuary', category: 'Social', location: 'Bangalore', volunteers: '800', projects: '32', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500' },
];

const NEARBY_NGOS = [
  { id: '1', name: 'Helping Hands', category: 'Education', distance: '2.5 km away', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400' },
  { id: '2', name: 'Ocean Life', category: 'Environment', distance: '4.2 km away', image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400' },
];

const CATEGORIES = ['Environment', 'Education', 'Health', 'Social', 'Animals', 'Disaster Relief'];

const ALL_NGOS = [
  { id: '1', name: 'Global Rescue', category: 'Health', location: 'Mumbai', volunteers: '320', events: '12', verified: true },
  { id: '2', name: 'Urban Green', category: 'Environment', location: 'Pune', volunteers: '150', events: '5', verified: false },
  { id: '3', name: 'Child Care Int.', category: 'Education', location: 'Delhi', volunteers: '500', events: '20', verified: true },
];

export const NGOsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const renderFeaturedNGO = ({ item }) => (
    <Card style={styles.featuredCard} onPress={() => navigation.navigate('NGODetails')}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredOverlay}>
        <Text variant="titleLarge" style={styles.featuredName}>{item.name}</Text>
        <Text variant="bodySmall" style={styles.featuredMeta}>{item.category} • {item.location}</Text>
        <View style={styles.featuredStatsRow}>
          <View style={styles.featuredStat}>
            <Text style={styles.statCount}>{item.volunteers}</Text>
            <Text style={styles.statLabel}>Volunteers</Text>
          </View>
          <View style={styles.featuredStat}>
            <Text style={styles.statCount}>{item.projects}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
        </View>
        <Button mode="contained" buttonColor={theme.colors.secondary} style={styles.featuredBtn}>View NGO</Button>
      </View>
    </Card>
  );

  const renderNearbyNGO = ({ item }) => (
    <Card style={styles.nearbyCard} onPress={() => navigation.navigate('NGODetails')}>
      <Image source={{ uri: item.image }} style={styles.nearbyImage} />
      <View style={styles.nearbyInfo}>
        <Text variant="titleMedium" numberOfLines={1}>{item.name}</Text>
        <Text variant="bodySmall" style={styles.nearbyMetaText}>📍 {item.distance}</Text>
        <Text variant="labelSmall" style={{ color: theme.colors.primary }}>Cause: {item.category}</Text>
      </View>
    </Card>
  );

  const renderNGOListItem = ({ item }) => (
    <Card style={styles.listCard} onPress={() => navigation.navigate('NGODetails')}>
      <View style={styles.listContent}>
        <Avatar.Text size={48} label={item.name.substring(0, 1)} style={{ backgroundColor: theme.colors.primary }} />
        <View style={styles.listInfo}>
          <View style={styles.listHeaderRow}>
            <Text variant="titleMedium" style={styles.listName}>{item.name}</Text>
            {item.verified && <MaterialCommunityIcons name="check-decagram" size={16} color={theme.colors.secondary} style={{ marginLeft: 4 }} />}
          </View>
          <Text variant="bodySmall" style={styles.listMeta}>{item.category} • {item.location}</Text>
          <Text variant="labelSmall" style={styles.listStats}>{item.volunteers} Volunteers | {item.events} Active Events</Text>
        </View>
        <IconButton icon="chevron-right" size={20} />
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header & Search Section */}
      <View style={styles.header}>
        <View>
          <Text variant="displaySmall" style={styles.headerTitle}>Discover NGOs</Text>
          <Text variant="bodyMedium" style={styles.headerSub}>Find causes that matter to you</Text>
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
            placeholder="Search NGOs, causes..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            elevation={0}
            inputStyle={styles.searchInput}
          />
          <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.colors.secondary }]}>
            <MaterialCommunityIcons name="tune-vertical" color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Featured NGOs Section */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>⭐ Featured NGOs</Text>
      </View>
      <FlatList
        horizontal
        data={FEATURED_NGOS}
        renderItem={renderFeaturedNGO}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* 3. Nearby NGOs Section */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>📍 NGOs Near You</Text>
      </View>
      <FlatList
        horizontal
        data={NEARBY_NGOS}
        renderItem={renderNearbyNGO}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* 5. NGO Categories */}
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
            showSelectedOverlay
          >
            {cat}
          </Chip>
        ))}
      </ScrollView>

      {/* 4. All NGOs List */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>All NGOs</Text>
      </View>
      <View style={styles.listContainer}>
        {ALL_NGOS.map(ngo => (
          <View key={ngo.id}>{renderNGOListItem({ item: ngo })}</View>
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
    marginBottom: 5,
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
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  horizontalList: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  featuredCard: {
    width: 280,
    height: 380,
    marginRight: 20,
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 24,
    justifyContent: 'flex-end',
  },
  featuredName: {
    color: '#FFF',
    fontWeight: '900',
  },
  featuredMeta: {
    color: '#F3F4F6',
    marginBottom: 15,
  },
  featuredStatsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  featuredStat: {
    marginRight: 25,
  },
  statCount: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statLabel: {
    color: '#D1D5DB',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  featuredBtn: {
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
  },
  nearbyCard: {
    width: 180,
    marginRight: 15,
    borderRadius: 24,
    backgroundColor: '#FFF',
    elevation: 2,
    padding: 8,
  },
  nearbyImage: {
    width: '100%',
    height: 120,
    borderRadius: 18,
  },
  nearbyInfo: {
    padding: 8,
  },
  nearbyMetaText: {
    color: '#6B7280',
    marginVertical: 4,
  },
  categoryScroll: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  categoryChip: {
    marginRight: 10,
    borderRadius: 12,
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
    marginBottom: 15,
    borderRadius: 24,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  listContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  listInfo: {
    flex: 1,
    marginLeft: 15,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listName: {
    fontWeight: 'bold',
  },
  listMeta: {
    color: '#6B7280',
    marginVertical: 2,
  },
  listStats: {
    color: '#9CA3AF',
  }
});
