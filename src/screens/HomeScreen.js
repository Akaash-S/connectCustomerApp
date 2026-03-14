import React from 'react';
import { ScrollView, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, IconButton, useTheme, Button, Divider } from 'react-native-paper';
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

// Helper for chip styling
const CustomChip = ({ children, style }) => (
  <View style={[styles.chipBase, style]}>{children}</View>
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <View>
          <Text variant="titleLarge" style={styles.greetingHeader}>Hello, Ak 👋</Text>
          <Text variant="bodyMedium" style={styles.greetingSub}>Let's make an impact today</Text>
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={14} color={theme.colors.secondary} />
            <Text variant="labelSmall" style={styles.locationText}>Chennai, India</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <IconButton icon="bell-outline" size={24} style={styles.headerBtn} />
          <Avatar.Image size={44} source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }} />
        </View>
      </View>

      {/* 2. Emergency / Quick Request Card */}
      <Card style={styles.emergencyCard}>
        <View style={styles.emergencyLayout}>
          <View flex={1}>
            <Text variant="titleMedium" style={styles.emergencyTitle}>🚨 Need help from volunteers?</Text>
            <Text variant="bodySmall" style={styles.emergencySub}>Post your request and nearby volunteers will assist you.</Text>
          </View>
          <Button 
            mode="contained" 
            buttonColor={theme.colors.primary} 
            onPress={() => navigation.navigate('RequestHelp')}
            style={styles.emergencyBtn}
          >
            Request Help
          </Button>
        </View>
      </Card>

      {/* 3. Quick Actions Grid */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Quick Actions</Text>
      </View>
      <View style={styles.actionsGrid}>
        {QUICK_ACTIONS.map(renderQuickAction)}
      </View>

      {/* 4. Nearby Help Requests */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Community Needs Help Near You</Text>
      </View>
      <FlatList
        horizontal
        data={NEARBY_REQUESTS}
        renderItem={renderNearbyRequest}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.nearbyList}
      />

      {/* 5. Upcoming Volunteer Events */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Upcoming Volunteer Events</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Events')}>
          <Text style={{ color: theme.colors.secondary, fontWeight: 'bold' }}>View All →</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={UPCOMING_EVENTS}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.nearbyList}
        renderItem={({ item }) => (
          <Card style={styles.eventCard}>
            <View style={styles.eventImageContainer}>
              <Image source={{ uri: item.image }} style={styles.eventImage} />
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeText}>{item.date.split(' ')[0]}</Text>
                <Text style={styles.dateBadgeMonth}>{item.date.split(' ')[1]}</Text>
              </View>
            </View>
            <View style={styles.eventFooter}>
              <View style={styles.eventTextContent}>
                <Text variant="titleMedium" numberOfLines={1} style={styles.eventTitleText}>{item.title}</Text>
                <View style={styles.eventMetaRow}>
                  <MaterialCommunityIcons name="map-marker" size={12} color="#9CA3AF" />
                  <Text variant="bodySmall" style={styles.eventMetaText}>{item.location}</Text>
                </View>
              </View>
            </View>
          </Card>
        )}
      />

      {/* 6. Community Impact Feed */}
      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Community Impact Feed</Text>
      </View>
      {IMPACT_POSTS.map(post => (
        <Card key={post.id} style={styles.feedCard}>
          <View style={styles.feedHeader}>
            <Avatar.Text size={36} label={post.ngo.substring(0, 1)} style={{ backgroundColor: theme.colors.primary }} />
            <View style={styles.feedHeaderInfo}>
              <Text variant="titleMedium" style={styles.feedNgoName}>{post.ngo}</Text>
              <Text variant="bodySmall" style={styles.feedTime}>2 hours ago • Sponsored</Text>
            </View>
            <IconButton icon="dots-horizontal" size={20} />
          </View>
          <View style={styles.feedImageContainer}>
            <Image source={{ uri: post.image }} style={styles.feedImage} />
            <View style={styles.feedStatsOverlay}>
              <Text variant="labelLarge" style={styles.feedStatsText}>{post.stats}</Text>
            </View>
          </View>
          <View style={styles.feedFooter}>
            <Text variant="titleLarge" style={styles.feedTitle}>{post.title}</Text>
            <View style={styles.feedActions}>
              <View style={styles.feedActionLeft}>
                <TouchableOpacity style={styles.feedActionBtn}>
                  <MaterialCommunityIcons name="heart-outline" size={24} color="#1A1C1E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.feedActionBtn}>
                  <MaterialCommunityIcons name="comment-outline" size={24} color="#1A1C1E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.feedActionBtn}>
                  <MaterialCommunityIcons name="share-variant-outline" size={24} color="#1A1C1E" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.feedBookmarkBtn}>
                <MaterialCommunityIcons name="bookmark-outline" size={24} color="#1A1C1E" />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      ))}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginBottom: 20,
  },
  greetingHeader: {
    fontWeight: '900',
    fontSize: 26,
  },
  greetingSub: {
    color: '#6B7280',
    marginTop: -2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: '#9CA3AF',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    backgroundColor: '#FFF',
    marginRight: 10,
    elevation: 2,
  },
  emergencyCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    backgroundColor: '#FFF',
    elevation: 0,
  },
  emergencyLayout: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  emergencySub: {
    color: '#6B7280',
    marginTop: 2,
  },
  emergencyBtn: {
    borderRadius: 12,
    marginLeft: 10,
  },
  impactBanner: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  impactItem: {
    alignItems: 'center',
    flex: 1,
  },
  impactCount: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 18,
  },
  impactLabel: {
    color: '#BBF7D0',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  impactDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginBottom: 5, // Reduced from 25 to remove unwanted space
  },
  actionCard: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    elevation: 1,
  },
  actionText: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E4D2B',
  },
  nearbyList: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  nearbyCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 24,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  nearbyContent: {
    padding: 15,
  },
  nearbyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nearbyTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  chipBase: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  nearbyMeta: {
    color: '#6B7280',
    marginBottom: 12,
  },
  viewDetailsBtn: {
    borderRadius: 12,
  },
  eventCard: {
    width: 260,
    marginRight: 15,
    borderRadius: 28,
    backgroundColor: '#FFF',
    elevation: 4,
    padding: 8,
    marginBottom: 10,
  },
  eventImageContainer: {
    width: '100%',
    height: 140,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    elevation: 2,
  },
  dateBadgeText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E4D2B',
  },
  dateBadgeMonth: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D97706',
    textTransform: 'uppercase',
    marginTop: -2,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingTop: 12,
  },
  eventTextContent: {
    flex: 1,
  },
  eventTitleText: {
    fontWeight: 'bold',
    color: '#1A1C1E',
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  eventMetaText: {
    color: '#6B7280',
    marginLeft: 4,
  },
  eventJoinBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  feedCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 32,
    backgroundColor: '#FFF',
    elevation: 5,
    overflow: 'hidden',
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  feedHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  feedNgoName: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  feedTime: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  feedImageContainer: {
    marginHorizontal: 12,
    height: 280,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  feedImage: {
    width: '100%',
    height: '100%',
  },
  feedStatsOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(30, 77, 43, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  feedStatsText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  feedFooter: {
    padding: 16,
  },
  feedTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 12,
    fontSize: 22,
  },
  feedActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedActionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedActionBtn: {
    marginRight: 16,
  },
  feedBookmarkBtn: {
    // Just align right
  }
});
