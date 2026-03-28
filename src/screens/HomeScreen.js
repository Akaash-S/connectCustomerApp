import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import { Text, Avatar, useTheme, Divider, Badge } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { id: '1', title: 'Request Help', icon: 'handshake', color: '#FFF1F2', route: 'Add' },
  { id: '2', title: 'Find NGOs', icon: 'hand-heart', color: '#F0F9FF', route: 'NGOs' },
  { id: '3', title: 'Support Peer', icon: 'hand-heart-outline', color: '#EEF2FF', route: 'Support' },
  { id: '4', title: 'Impact Hub', icon: 'calendar-star', color: '#FFF7ED', route: 'Events' },
  { id: '5', title: 'Security Hub', icon: 'shield-lock', color: '#F5F3FF', route: 'SecurityPrivacy' },
];

export const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [user, setUser] = useState({ fullName: '', avatarUrl: null });
  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [featuredNGOs, setFeaturedNGOs] = useState([]);
  const [stats, setStats] = useState({ volunteers: 0, ngos: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, reqData, ngoData, statsData] = await Promise.allSettled([
          api.getUserProfile(),
          api.getRequests(5),
          api.getNGOs(5),
          api.getUserStats(),
        ]);

        if (profile.status === 'fulfilled') setUser(profile.value);
        if (reqData.status === 'fulfilled' && reqData.value) setNearbyRequests(reqData.value);
        if (ngoData.status === 'fulfilled' && ngoData.value) setFeaturedNGOs(ngoData.value);
        if (statsData.status === 'fulfilled') setStats(statsData.value);
      } catch (error) {
        console.warn("API Error (Home):", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: 120
        }}
        scrollEnabled={true}
      >
        {isLoading ? (
          <View style={[styles.mainLoader, { marginTop: SCREEN_WIDTH * 0.5 }]}>
            <ActivityIndicator color="#1A1C1E" size="large" />
          </View>
        ) : (
          <>
            {/* HEADER SECTION */}
            <View style={styles.header}>
              <View style={styles.greetingBox}>
                <Text style={styles.greetingHeader}>Hello, {user.fullName.split(' ')[0]}</Text>
                <Text style={styles.welcomeSub}>Active community member</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity 
                   style={styles.notifIconPill} 
                   onPress={() => navigation.navigate('Notifications')}
                   activeOpacity={0.7}
                >
                   <MaterialCommunityIcons name="bell-outline" size={24} color="#1A1C1E" />
                   <View style={styles.activeDot} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('Profile')}>
                  <Avatar.Image size={44} source={{ uri: user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }} />
                </TouchableOpacity>
              </View>
            </View>

            {/* SEARCH SECTION */}
            <View style={styles.searchSection}>
              <View style={styles.searchBox}>
                <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
                <TextInput
                  placeholder="Search initiatives..."
                  style={styles.searchInput}
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* QUICK HUB SECTION */}
            <View style={styles.hubSection}>
              <Text style={styles.sectionTitle}>Community Hub</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {QUICK_ACTIONS.map(action => (
                  <TouchableOpacity
                    key={action.id}
                    style={[styles.actionCard, { backgroundColor: action.color }]}
                    onPress={() => navigation.navigate(action.route)}
                  >
                    <MaterialCommunityIcons name={action.icon} size={28} color="#1A1C1E" />
                    <Text style={styles.actionText}>{action.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* STATS SECTION */}
            <View style={styles.statsSection}>
              <View style={styles.statsCard}>
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{stats.volunteers > 1000 ? `${(stats.volunteers / 1000).toFixed(1)}k` : stats.volunteers}</Text>
                  <Text style={styles.statLabel}>Local Partners</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{stats.solvedNeeds || 0}</Text>
                  <Text style={styles.statLabel}>Needs Solved</Text>
                </View>
              </View>
            </View>

            {/* NGO INITIATIVES SECTION */}
            <View style={styles.feedSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle_Feed}>NGO Initiatives</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                  <Text style={styles.seeAllText}>EXPLORE ALL</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {featuredNGOs.map((ngo, idx) => (
                  <TouchableOpacity key={idx} style={styles.featuredNgoCard}>
                    <Image source={{ uri: `https://images.unsplash.com/photo-${1500000000000 + idx}?w=400` }} style={styles.featuredImage} />
                    <View style={styles.featuredOverlay}>
                      <Text style={styles.featuredName}>{ngo.name || 'Giving Hope'}</Text>
                      <Text style={styles.featuredLocation}>{ngo.location || 'Chennai'}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* COMMUNITY NEEDS SECTION */}
            <View style={styles.feedSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle_Feed}>Support Needs</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CommunityFeed')}>
                  <Text style={styles.seeAllText}>VIEW HUB</Text>
                </TouchableOpacity>
              </View>
              {nearbyRequests.length > 0 ? nearbyRequests.map((req, idx) => (
                <TouchableOpacity key={idx} style={styles.reqCard} onPress={() => navigation.navigate('RequestDetails', { requestId: req.id })}>
                  <View style={styles.reqIconBox}>
                    <MaterialCommunityIcons name="broadcast" size={24} color="#EF4444" />
                  </View>
                  <View style={styles.reqInfo}>
                    <Text style={styles.reqTitle} numberOfLines={1}>{req.title}</Text>
                    <Text style={styles.reqSub}>{req.location} • {req.votes || 0} Highlights</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
                </TouchableOpacity>
              )) : (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyText}>No reports yet</Text>
                </View>
              )}
            </View>

          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  mainLoader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 40, // Uniform Rhythm
  },
  greetingBox: {
    flex: 1,
  },
  greetingHeader: {
    fontSize: 26,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  welcomeSub: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifIconPill: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F8F9FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  activeDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  profileBtn: {
    padding: 3,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  searchSection: {
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
  hubSection: {
    marginBottom: 40, // Uniform Rhythm
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '910',
    color: '#1A1C1E',
    marginLeft: 24,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sectionTitle_Feed: {
    fontSize: 20,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  horizontalScrollContent: {
    paddingHorizontal: 24,
    gap: 15,
  },
  actionCard: {
    width: 130,
    height: 130,
    borderRadius: 35, // Premium Radius
    padding: 24,
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '910',
    color: '#1A1C1E',
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 40, // Uniform Rhythm
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1C1E',
    borderRadius: 35, // Premium Radius
    padding: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 24,
    fontWeight: '910',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginTop: 6,
    letterSpacing: 1.5,
  },
  statDivider: {
    width: 1,
    height: 35,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  feedSection: {
    marginBottom: 40, // Uniform Rhythm
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  featuredNgoCard: {
    width: 260,
    height: 170,
    borderRadius: 35, // Premium Radius
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24, // Consistent Internal Padding
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  featuredName: {
    color: '#FFFFFF',
    fontWeight: '910',
    fontSize: 16,
    letterSpacing: -0.2,
  },
  featuredLocation: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  reqCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 24, // Consistent Internal Padding
    borderRadius: 35, // Standardized Radius
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
  },
  reqIconBox: {
    width: 52,
    height: 52,
    borderRadius: 18, // Standardized Icon Box Radius
    backgroundColor: '#FFF1F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reqInfo: {
    flex: 1,
    marginLeft: 18,
  },
  reqTitle: {
    fontSize: 16,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.2,
  },
  reqSub: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 4,
  },
  emptyCard: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#CBD5E1',
    fontWeight: '800',
  }
});
