import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Switch, Dimensions, Image, ActivityIndicator } from 'react-native';
import { Text, Avatar, List, Divider, Button, Card, ProgressBar, Badge } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ACHIEVEMENTS = [
  { id: '1', title: 'First Support', icon: 'heart', color: '#FFF1F2' },
  { id: '2', title: 'Community Pillar', icon: 'pillar', color: '#F0F9FF' },
  { id: '3', title: 'Active Voter', icon: 'vote', color: '#F0FDF4' },
  { id: '4', title: 'Kind Heart', icon: 'hand-heart', color: '#FFF7ED' },
];

export const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    avatarUrl: null,
    impactScore: 0,
    trustLevel: 0,
    joinedEvents: 0,
    totalDonated: 0,
    votesCast: 0
  });
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const [profileData, activityData] = await Promise.all([
        api.getUserProfile(),
        api.getUserActivity()
      ]);
      setUser(profileData);
      setActivity(activityData);
    } catch (error) {
      console.warn("Profile fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const FeedItem = ({ item, isLast }) => (
    <View style={styles.feedItem}>
       {!isLast && <View style={styles.feedLine} />}
       <View style={[styles.feedDot, { backgroundColor: item.color || '#CBD5E1' }]} />
       <View style={styles.feedContent}>
          <Text style={styles.feedTitle}>{item.action}</Text>
          <Text style={styles.feedMeta}>{item.date}</Text>
       </View>
       <View style={[styles.feedIconBox, { backgroundColor: (item.color || '#1A1C1E') + '10' }]}>
          <MaterialCommunityIcons name={item.icon || 'history'} size={18} color={item.color || '#1A1C1E'} />
       </View>
    </View>
  );

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
      >
        {/* INTEGRATED SINGLE-LAYER HEADER */}
        <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>My Hub</Text>
              <Text style={styles.headerSub}>Community footprint</Text>
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
               <TouchableOpacity style={styles.profileBadgePill}>
                  <MaterialCommunityIcons name="shield-check" size={20} color="#3B82F6" />
                  <Text style={styles.profileBadgeText}>{user.isVerified ? 'Verified' : 'Member'}</Text>
               </TouchableOpacity>
            </View>
        </View>

        {isLoading ? (
          <View style={styles.mainLoader}>
             <ActivityIndicator color="#1A1C1E" size="large" />
          </View>
        ) : (
          <>
            {/* PROFILE HERO */}
            <View style={styles.profileHero}>
               <View style={styles.avatarWrapper}>
                  <Avatar.Image 
                    size={100} 
                    source={{ uri: user.avatarUrl || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200' }} 
                    style={styles.avatar}
                  />
                  <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
                     <MaterialCommunityIcons name="pencil" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
               </View>
               <Text style={styles.userName}>{user.fullName}</Text>
               <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            {/* IMPACT REPUTATION CARD */}
            <View style={styles.sectionWrapper}>
               <View style={styles.impactCard}>
                  <View style={styles.impactHeader}>
                     <Text style={styles.impactTitle}>Community Reputation</Text>
                     <View style={styles.xpBadge}>
                        <Text style={styles.xpText}>{user.impactScore || 0} XP</Text>
                     </View>
                  </View>
                  <ProgressBar progress={Math.min((user.impactScore || 0) / 1000, 1)} color="#FFFFFF" style={styles.progressBar} />
                  <View style={styles.statsRow}>
                     <View style={styles.statBox}>
                        <Text style={styles.statNum}>{user.stats?.eventsJoined || 0}</Text>
                        <Text style={styles.statLab}>Events</Text>
                     </View>
                     <View style={styles.statDivider} />
                     <View style={styles.statBox}>
                        <Text style={styles.statNum}>{user.stats?.reputationScore || 0}</Text>
                        <Text style={styles.statLab}>Score</Text>
                     </View>
                     <View style={styles.statDivider} />
                     <View style={styles.statBox}>
                        <Text style={styles.statNum}>{user.stats?.requestsCreated || 0}</Text>
                        <Text style={styles.statLab}>Requests</Text>
                     </View>
                  </View>
               </View>
            </View>

            {/* ACHIEVEMENTS */}
            <View style={styles.sectionWrapper}>
               <Text style={styles.sectionTitle}>Recognitions</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeScroll}>
                  {ACHIEVEMENTS.map(item => (
                    <View key={item.id} style={[styles.badgeItem, { backgroundColor: item.color }]}>
                       <MaterialCommunityIcons name={item.icon} size={28} color="#1A1C1E" />
                       <Text style={styles.badgeTitle}>{item.title}</Text>
                    </View>
                  ))}
               </ScrollView>
            </View>

            {/* ACTION GROUPS */}
            <View style={styles.actionSection}>
               <Text style={styles.sectionTitle}>Engagement</Text>
               <View style={styles.actionGrid}>
                  <TouchableOpacity style={styles.gridBtn} onPress={() => navigation.navigate('JoinedEvents')}>
                     <View style={[styles.gridIcon, { backgroundColor: '#F0F9FF' }]}>
                        <MaterialCommunityIcons name="calendar-check" size={24} color="#3B82F6" />
                     </View>
                     <Text style={styles.gridText}>My Initiatives</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gridBtn} onPress={() => navigation.navigate('MyRequests')}>
                     <View style={[styles.gridIcon, { backgroundColor: '#FFF1F2' }]}>
                        <MaterialCommunityIcons name="hand-heart" size={24} color="#E11D48" />
                     </View>
                     <Text style={styles.gridText}>My Requests</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gridBtn} onPress={() => navigation.navigate('SecurityPrivacy')}>
                     <View style={[styles.gridIcon, { backgroundColor: '#F5F3FF' }]}>
                        <MaterialCommunityIcons name="shield-lock" size={24} color="#7C3AED" />
                     </View>
                     <Text style={styles.gridText}>Security Hub</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gridBtn} onPress={() => navigation.navigate('ImpactLogs')}>
                     <View style={[styles.gridIcon, { backgroundColor: '#F0FDF4' }]}>
                        <MaterialCommunityIcons name="history" size={24} color="#10B981" />
                     </View>
                     <Text style={styles.gridText}>Impact Logs</Text>
                  </TouchableOpacity>
               </View>
            </View>

            {/* RECENT ACTIVITY FEED (FOOTPRINT) */}
            <View style={styles.feedSection}>
               <Text style={styles.sectionTitle}>Recent Footprint</Text>
               <View style={styles.feedContainer}>
                  {activity && activity.length > 0 ? (
                    activity.map((item, index) => (
                      <FeedItem key={item.id} item={item} isLast={index === activity.length - 1} />
                    ))
                  ) : (
                    <Text style={styles.emptyFeedText}>No recent activity found.</Text>
                  )}
               </View>
            </View>

                <TouchableOpacity 
              style={styles.logoutBtn} 
              onPress={() => api.logout()}
              activeOpacity={0.8}
            >
               <MaterialCommunityIcons name="logout-variant" size={20} color="#EF4444" />
               <Text style={styles.logoutText}>Sign Out of Hub</Text>
            </TouchableOpacity>
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
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 40,
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
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
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
  profileBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  profileBadgeText: {
    fontSize: 11,
    fontWeight: '910',
    color: '#3B82F6',
  },
  profileHero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#F8F9FA',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1A1C1E',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 4,
  },
  sectionWrapper: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  impactCard: {
    backgroundColor: '#1A1C1E',
    borderRadius: 35,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
  },
  impactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  impactTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '910',
  },
  xpBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },
  xpText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '910',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '910',
  },
  statLab: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginTop: 6,
    letterSpacing: 1.5,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '910',
    color: '#1A1C1E',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  badgeScroll: {
    gap: 15,
  },
  badgeItem: {
    width: 130,
    height: 130,
    borderRadius: 35,
    padding: 24,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  badgeTitle: {
    fontSize: 13,
    fontWeight: '910',
    color: '#1A1C1E',
    lineHeight: 18,
  },
  actionSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  gridBtn: {
    width: (SCREEN_WIDTH - 63) / 2,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 4,
  },
  gridIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '910',
    color: '#1A1C1E',
  },
  feedSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  feedContainer: {
    marginTop: 10,
    paddingLeft: 4,
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 30,
  },
  feedLine: {
    position: 'absolute',
    left: 4,
    top: 15,
    bottom: -25,
    width: 2,
    backgroundColor: '#F1F5F9',
  },
  feedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CBD5E1',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  feedContent: {
    flex: 1,
  },
  feedTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  feedMeta: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 4,
  },
  feedIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyFeedText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
  logoutBtn: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    height: 65,
    borderRadius: 35, // Master Premium Radius
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 60,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    elevation: 4,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '910',
    letterSpacing: -0.5,
  }
});
