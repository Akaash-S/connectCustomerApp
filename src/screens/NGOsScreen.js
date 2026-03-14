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

const MeshBackground = () => (
  <View style={[StyleSheet.absoluteFill, { backgroundColor: '#F0FDFA' }]}>
    <View style={[styles.blob, { top: -100, left: -50, backgroundColor: 'rgba(13, 148, 136, 0.08)', width: 350, height: 350 }]} />
    <View style={[styles.blob, { bottom: 200, right: -100, backgroundColor: 'rgba(59, 130, 246, 0.05)', width: 450, height: 450 }]} />
  </View>
);

export const NGOsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const renderFeaturedNGO = ({ item }) => (
    <Card style={styles.featuredGlassCard} onPress={() => navigation.navigate('NGODetails')} activeOpacity={1}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.glassOverlay}>
        <View style={styles.categoryBadgeMini}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
        <Text variant="titleLarge" style={styles.featuredName}>{item.name}</Text>
        
        <View style={styles.featuredStatsRow}>
          <View style={styles.featuredStat}>
            <Text style={styles.statCount}>{item.volunteers}</Text>
            <Text style={styles.statLabel}>Volunteers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.featuredStat}>
            <Text style={styles.statCount}>{item.projects}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
        </View>
        
        <Button mode="contained" buttonColor="rgba(255,255,255,0.9)" textColor="#1A1C1E" style={styles.featuredBtn}>
          View Impact
        </Button>
      </View>
    </Card>
  );

  const renderNearbyNGO = ({ item }) => (
    <Card style={styles.nearbyGlassCard} onPress={() => navigation.navigate('NGODetails')} activeOpacity={1}>
      <Image source={{ uri: item.image }} style={styles.nearbyImage} />
      <View style={styles.nearbyInfo}>
        <Text variant="titleMedium" numberOfLines={1} style={styles.nearbyName}>{item.name}</Text>
        <View style={styles.nearbyMetaRow}>
          <MaterialCommunityIcons name="map-marker" size={14} color="#6B7280" />
          <Text variant="bodySmall" style={styles.nearbyMetaText}>{item.distance}</Text>
        </View>
      </View>
    </Card>
  );

  const renderNGOListItem = ({ item }) => (
    <Card style={styles.listGlassCard} onPress={() => navigation.navigate('NGODetails')} activeOpacity={1}>
      <View style={styles.listContent}>
        <Avatar.Text size={54} label={item.name.substring(0, 1)} style={{ backgroundColor: '#E0F2FE' }} color="#0284C7" />
        <View style={styles.listInfo}>
          <View style={styles.listHeaderRow}>
            <Text variant="titleMedium" style={styles.listName}>{item.name}</Text>
            {item.verified && <MaterialCommunityIcons name="check-decagram" size={18} color="#0EA5E9" style={{ marginLeft: 6 }} />}
          </View>
          <Text variant="bodySmall" style={styles.listMeta}>{item.category} • {item.location}</Text>
          <View style={styles.listStatsRow}>
            <MaterialCommunityIcons name="account-group-outline" size={14} color="#9CA3AF" />
            <Text variant="labelSmall" style={styles.listStatsText}>{item.volunteers} active members</Text>
          </View>
        </View>
        <IconButton icon="chevron-right" size={24} iconColor="#D1D5DB" />
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
            <Text variant="displaySmall" style={styles.headerTitle}>Discover NGOs</Text>
            <Text variant="bodyLarge" style={styles.headerSub}>Empower the community today</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.glassSearchWrapper}>
            <MaterialCommunityIcons name="magnify" size={24} color="#6B7280" style={styles.searchIcon} />
            <Searchbar
              placeholder="Search by cause, name or city..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.glassSearchBar}
              elevation={0}
              placeholderTextColor="#9CA3AF"
              inputStyle={styles.searchInput}
            />
            <TouchableOpacity style={styles.filterGlassBtn}>
              <MaterialCommunityIcons name="tune-vertical" color="#1A1C1E" size={20} />
            </TouchableOpacity>
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

        {/* Featured NGOs Section */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Featured Organizations</Text>
        </View>
        <FlatList
          horizontal
          data={FEATURED_NGOS}
          renderItem={renderFeaturedNGO}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Nearby NGOs Section */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Working Near You</Text>
        </View>
        <FlatList
          horizontal
          data={NEARBY_NGOS}
          renderItem={renderNearbyNGO}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* All NGOs List */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>All Organizations</Text>
          <Button mode="text" labelStyle={{ color: '#0EA5E9' }}>Filter</Button>
        </View>
        <View style={styles.listContainer}>
          {ALL_NGOS.map(ngo => (
            <View key={ngo.id}>{renderNGOListItem({ item: ngo })}</View>
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
  searchIcon: {
    marginRight: 4,
  },
  glassSearchBar: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
  },
  searchInput: {
    fontSize: 15,
    paddingLeft: 0,
  },
  filterGlassBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
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
    borderColor: '#1A1C1E',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 280,
    height: 380,
    marginRight: 20,
    borderRadius: 36,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 24,
    justifyContent: 'flex-end',
  },
  categoryBadgeMini: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  featuredName: {
    color: '#FFF',
    fontWeight: '900',
    marginBottom: 16,
  },
  featuredStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featuredStat: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    mx: 15,
  },
  statCount: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 18,
  },
  statLabel: {
    color: '#E5E7EB',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  featuredBtn: {
    borderRadius: 16,
    height: 48,
  },
  nearbyGlassCard: {
    width: 230,
    marginRight: 20,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  nearbyImage: {
    width: '100%',
    height: 120,
    borderRadius: 18,
  },
  nearbyInfo: {
    padding: 12,
  },
  nearbyName: {
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 6,
  },
  nearbyMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nearbyMetaText: {
    color: '#6B7280',
    fontSize: 12,
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
  listContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  listInfo: {
    flex: 1,
    marginLeft: 16,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listName: {
    fontWeight: '800',
    color: '#1A1C1E',
  },
  listMeta: {
    color: '#6B7280',
    marginVertical: 4,
  },
  listStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  listStatsText: {
    color: '#9CA3AF',
    fontWeight: '600',
  }
});
