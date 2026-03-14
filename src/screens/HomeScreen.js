import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Text, Card, Avatar, IconButton, useTheme, Button, Divider, Badge } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const QUICK_ACTIONS = [
  { id: '1', title: 'Request Help', icon: 'hand-heart', color: '#FDF2F8', route: 'RequestHelp' },
  { id: '2', title: 'Explore NGOs', icon: 'office-building', color: '#E8F5E9', route: 'NGOs' },
  { id: '3', title: 'Upcoming Events', icon: 'calendar-star', color: '#FFF7ED', route: 'Events' },
  { id: '4', title: 'Become Volunteer', icon: 'account-group', color: '#F0F9FF', route: 'NGOs' },
];

const NEARBY_REQUESTS = [
  { id: '1', title: 'Blood Donation Needed', distance: '2 km away', time: 'Tomorrow', category: 'Health', type: 'Urgent' },
  { id: '2', title: 'Tree Plantation', distance: '5 km away', time: 'Saturday', category: 'Environment', type: 'Community' },
  { id: '3', title: 'Food for Shelter', distance: '3.5 km away', time: 'Today', category: 'Social', type: 'Urgent' },
];

const UPCOMING_EVENTS = [
  { id: '1', title: 'Beach Cleanup Drive', date: '25 March', location: 'Marina Beach', image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400' },
  { id: '2', title: 'Old Age Home Visit', date: '28 March', location: 'Green View', image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400' },
];

const IMPACT_POSTS = [
  {
    id: '1',
    ngo: 'Green Earth NGO',
    title: 'Completed Tree Plantation Drive!',
    stats: '120 trees planted 🌱 | 50+ lives impacted',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400'
  },
];

const FEATURED_NGOS = [
  { id: '1', name: 'Green Earth', impact: '12.5k trees planted', initials: 'GE', color: '#10B981' },
  { id: '2', name: 'Hope Sanctuary', impact: '500+ families fed', initials: 'HS', color: '#F59E0B' },
  { id: '3', name: 'Ocean Care', impact: '2t plastic removed', initials: 'OC', color: '#3B82F6' },
];

// Helper for chip styling
const CustomChip = ({ children, style }) => (
  <View style={[styles.chipBase, style]}>{children}</View>
);

const MeshBackground = () => (
  <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF9F0' }]}>
    <View style={[styles.blob, { top: -100, left: -50, backgroundColor: 'rgba(217, 119, 6, 0.12)', width: 350, height: 350 }]} />
    <View style={[styles.blob, { bottom: 200, right: -100, backgroundColor: 'rgba(16, 185, 129, 0.08)', width: 450, height: 450 }]} />
    <View style={[styles.blob, { top: '30%', right: '10%', backgroundColor: 'rgba(99, 102, 241, 0.05)', width: 300, height: 300 }]} />
  </View>
);

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  const renderQuickAction = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.actionCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate(item.route)}
    >
      <MaterialCommunityIcons name={item.icon} size={32} color={theme.colors.primary} />
      <Text variant="labelLarge" style={styles.actionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderNearbyRequest = ({ item }) => (
    <Card style={styles.nearbyCard}>
      <View style={styles.nearbyContent}>
        <View style={styles.nearbyHeader}>
          <Text variant="titleMedium" style={styles.nearbyTitle}>{item.title}</Text>
          <CustomChip style={[styles.typeChip, { backgroundColor: item.type === 'Urgent' ? '#FEE2E2' : '#E0F2FE' }]}>
            <Text style={{ color: item.type === 'Urgent' ? '#B91C1C' : '#0369A1', fontSize: 10, fontWeight: 'bold' }}>{item.type}</Text>
          </CustomChip>
        </View>
        <Text variant="bodySmall" style={styles.nearbyMeta}>📍 {item.distance} | ⏰ {item.time}</Text>
        <Button mode="outlined" style={styles.viewDetailsBtn} labelStyle={{ fontSize: 12 }}>View Details</Button>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <MeshBackground />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Cinematic Header & Search */}
        <View style={styles.cinematicHeader}>
          <View style={styles.headerTopRow}>
            <View>
              <Text variant="titleLarge" style={styles.greeting}>Good Morning,</Text>
              <Text variant="displaySmall" style={styles.userName}>Akash 👋</Text>
            </View>
            <View style={styles.headerIcons}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Notifications')}
            >
                <View style={styles.glassNotifBtn}>
                  <IconButton icon="bell-outline" size={24} iconColor="#1A1C1E" style={{ margin: 0 }} />
                  <Badge style={styles.homeBadge} size={16}>3</Badge>
                </View>
              </TouchableOpacity>
              <View style={styles.avatarContainer}>
                <Avatar.Image size={48} source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }} />
              </View>
            </View>
          </View>

          {/* Floating Premium Search */}
          <View style={styles.searchWrapper}>
            <View style={styles.premiumSearchBar}>
              <MaterialCommunityIcons name="magnify" size={22} color="#94A3B8" />
              <Text style={styles.searchText}>Search for NGOs, events, or help...</Text>
              <View style={styles.searchFilterBtn}>
                <MaterialCommunityIcons name="tune-variant" size={20} color="#FFF" />
              </View>
            </View>
          </View>
        </View>

        {/* Urgent Help 2.0 (Deep Palette) */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('Reports', { screen: 'RequestDetails' })}
          style={styles.urgentWrapper}
        >
          <View style={styles.urgentCardPremium}>
            <View style={styles.urgentContentRow}>
              <View style={styles.urgentLeftCol}>
                <View style={styles.liveIndicatorRow}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>CRITICAL • LIVE</Text>
                </View>
                <Text variant="headlineSmall" style={styles.urgentTitleDeep}>Oxygen Support Needed</Text>
                <View style={styles.urgentLocRow}>
                  <MaterialCommunityIcons name="map-marker-radius" size={14} color="#94A3B8" />
                  <Text style={styles.urgentLocText}>Velachery • 1.2 km away</Text>
                </View>
              </View>
              <View style={styles.respondAction}>
                <View style={styles.respondCircle}>
                  <MaterialCommunityIcons name="chevron-right" size={28} color="#FFF" />
                </View>
                <Text style={styles.respondLabel}>RESPOND</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Premium Bento Grid - Services */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Explore Services</Text>
        </View>

        <View style={styles.bentoGrid}>
          {/* Main Large Bento Item */}
          <TouchableOpacity
            style={[styles.bentoItem, styles.bentoLarge]}
            onPress={() => navigation.navigate('RequestHelp')}
            activeOpacity={1}
          >
            <View style={[styles.premiumCardLarge, styles.bentoGlass]}>
              <View style={[styles.bentoIconBox, { backgroundColor: '#FFEECC' }]}>
                <MaterialCommunityIcons name="hand-heart" size={32} color="#D97706" />
              </View>
              <View style={styles.bentoContentLarge}>
                <Text style={styles.bentoTitleLarge}>Request Help</Text>
                <Text style={styles.bentoSubLarge}>Get assistance from our community.</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.bentoRightCol}>
            {/* Medium Bento Items */}
            <TouchableOpacity
              style={[styles.bentoItem, styles.bentoSmall]}
              onPress={() => navigation.navigate('NGOs')}
              activeOpacity={1}
            >
              <View style={[styles.glassCard, styles.bentoGlass]}>
                <View style={[styles.bentoIconBoxSmall, { backgroundColor: '#E0F2FE' }]}>
                  <MaterialCommunityIcons name="office-building" size={24} color="#0EA5E9" />
                </View>
                <Text style={styles.bentoTitleSmall}>Find NGOs</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bentoItem, styles.bentoSmall]}
              onPress={() => navigation.navigate('Events')}
              activeOpacity={1}
            >
              <View style={[styles.glassCard, styles.bentoGlass]}>
                <View style={[styles.bentoIconBoxSmall, { backgroundColor: '#F0FDF4' }]}>
                  <MaterialCommunityIcons name="calendar-star" size={24} color="#10B981" />
                </View>
                <Text style={styles.bentoTitleSmall}>All Events</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby Requests Section */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Help Needed Nearby</Text>
          <Button mode="text" labelStyle={{ color: '#D97706' }}>View All</Button>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {NEARBY_REQUESTS.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={1}
              onPress={() => navigation.navigate('Reports', { screen: 'RequestDetails' })}
            >
              <Card style={styles.nearbyPremiumCard}>
                <View style={styles.nearbyContent}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text variant="titleMedium" style={styles.nearbyTitle}>{item.title}</Text>
                  <Text variant="bodySmall" style={styles.nearbyMeta}>📍 {item.distance} • {item.time}</Text>

                  <View style={styles.nearbyFooter}>
                    <View style={styles.volunteersNeeded}>
                      <MaterialCommunityIcons name="account-group" size={16} color="#6B7280" />
                      <Text style={styles.volunteersText}>3 Needed</Text>
                    </View>
                    <Button mode="contained-tonal" compact style={styles.nearbyBtn}>View</Button>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* NGO Stories/Featured */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>NGO Highlights</Text>
        </View>

        {FEATURED_NGOS.map(ngo => (
          <TouchableOpacity
            key={ngo.id}
            activeOpacity={1}
            onPress={() => navigation.navigate('NGOs', { screen: 'NGODetails' })}
          >
            <Card style={styles.ngoPremiumCard}>
              <View style={styles.ngoCardContent}>
                <Avatar.Text size={48} label={ngo.initials} style={{ backgroundColor: ngo.color }} />
                <View style={styles.ngoInfo}>
                  <Text variant="titleMedium" style={styles.ngoName}>{ngo.name}</Text>
                  <Text variant="bodySmall" style={styles.ngoImpact}>{ngo.impact}</Text>
                </View>
                <IconButton icon="chevron-right" size={24} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  userName: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  glassNotifBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  homeBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarContainer: {
    padding: 3,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    elevation: 4,
  },
  urgentCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 32,
    backgroundColor: '#1F2937',
    elevation: 10,
    overflow: 'hidden',
  },
  urgentContent: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  urgentLeft: {
    flex: 1,
  },
  urgentBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  urgentBadgeText: {
    color: '#F87171',
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 1,
  },
  urgentTitle: {
    color: '#FFF',
    fontWeight: '800',
  },
  urgentMeta: {
    color: '#9CA3AF',
    marginTop: 4,
  },
  urgentBtn: {
    borderRadius: 16,
    height: 44,
  },
  cinematicHeader: {
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTopRow: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchWrapper: {
    paddingHorizontal: 24,
  },
  premiumSearchBar: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchText: {
    flex: 1,
    marginLeft: 12,
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  searchFilterBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentWrapper: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  urgentCardPremium: {
    backgroundColor: '#0F172A',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 10,
  },
  urgentContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  urgentLeftCol: {
    flex: 1,
    marginRight: 16,
  },
  liveIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  liveText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  urgentTitleDeep: {
    color: '#F8FAFC',
    fontWeight: '900',
    marginBottom: 8,
  },
  urgentLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  urgentLocText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  respondAction: {
    alignItems: 'center',
    gap: 8,
  },
  respondCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  respondLabel: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
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
  bentoGrid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 16,
    height: 220,
    marginBottom: 10,
  },
  bentoItem: {
    flex: 1,
  },
  bentoLarge: {
    flex: 1.2,
  },
  bentoRightCol: {
    flex: 1,
    gap: 16,
  },
  glassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    flex: 1, // Ensures perfect fill without hacks
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'space-between',
  },
  bentoGlass: {
    // Premium depth already handled in glassCard
  },
  bentoIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumCardLarge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'space-between',
  },
  bentoContentLarge: {
    // Spacer handled by space-between
  },
  bentoTitleLarge: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 8,
  },
  bentoSubLarge: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 20,
  },
  bentoIconBoxSmall: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bentoTitleSmall: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  horizontalList: {
    paddingLeft: 24,
    paddingBottom: 24,
    paddingRight: 24,
  },
  nearbyPremiumCard: {
    width: 260,
    marginRight: 20,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  nearbyContent: {
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryText: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  nearbyTitle: {
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 4,
  },
  nearbyMeta: {
    color: '#9CA3AF',
    marginBottom: 16,
  },
  nearbyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  volunteersNeeded: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  volunteersText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  nearbyBtn: {
    borderRadius: 12,
  },
  ngoPremiumCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  ngoCardContent: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ngoInfo: {
    flex: 1,
    marginLeft: 16,
  },
  ngoName: {
    fontWeight: '800',
    color: '#1A1C1E',
  },
  ngoImpact: {
    color: '#6B7280',
    marginTop: 2,
  }
});
