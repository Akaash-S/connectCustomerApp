import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Switch, Dimensions, Image } from 'react-native';
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
    fullName: 'Akash',
    email: 'akash@connect.com',
    avatarUrl: null,
    impactScore: 450,
    trustLevel: 0.75,
    joinedEvents: 8,
    totalDonated: 1250,
    votesCast: 42
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getUserProfile();
        setUser(data);
      } catch (error) {
        console.warn("Profile fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
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
        {/* INTEGRATED SINGLE-LAYER HEADER (HUB STYLE) */}
        <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>My Hub</Text>
              <Text style={styles.headerSub}>Community footprint</Text>
            </View>
            <TouchableOpacity style={styles.profileBadgePill}>
               <MaterialCommunityIcons name="shield-check" size={20} color="#3B82F6" />
               <Text style={styles.profileBadgeText}>Verified</Text>
            </TouchableOpacity>
        </View>

        {/* PROFILE HERO */}
        <View style={styles.profileHero}>
           <View style={styles.avatarWrapper}>
              <Avatar.Image 
                size={100} 
                source={{ uri: user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} 
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
                    <Text style={styles.xpText}>{user.impactScore} XP</Text>
                 </View>
              </View>
              <ProgressBar progress={0.6} color="#FFFFFF" style={styles.progressBar} />
              <View style={styles.statsRow}>
                 <View style={styles.statBox}>
                    <Text style={styles.statNum}>{user.joinedEvents}</Text>
                    <Text style={styles.statLab}>Events</Text>
                 </View>
                 <View style={styles.statDivider} />
                 <View style={styles.statBox}>
                    <Text style={styles.statNum}>{user.votesCast}</Text>
                    <Text style={styles.statLab}>Highlights</Text>
                 </View>
                 <View style={styles.statDivider} />
                 <View style={styles.statBox}>
                    <Text style={styles.statNum}>${user.totalDonated}</Text>
                    <Text style={styles.statLab}>Supported</Text>
                 </View>
              </View>
           </View>
        </View>

        {/* ACHIEVEMENTS (NON-STANDARD DISPLAY) */}
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
                 <Text style={styles.gridText}>Privacy Hub</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridBtn}>
                 <View style={[styles.gridIcon, { backgroundColor: '#F0FDF4' }]}>
                    <MaterialCommunityIcons name="history" size={24} color="#10B981" />
                 </View>
                 <Text style={styles.gridText}>Impact Logs</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* RECENT ACTIVITY FEED */}
        <View style={styles.feedSection}>
           <Text style={styles.sectionTitle}>Recent Footprint</Text>
           <View style={styles.feedContainer}>
              <View style={styles.feedItem}>
                 <View style={styles.feedLine} />
                 <View style={styles.feedDot} />
                 <View style={styles.feedContent}>
                    <Text style={styles.feedTitle}>Highlighted a Medical Request</Text>
                    <Text style={styles.feedMeta}>Today, 2:30 PM • Anna Nagar</Text>
                 </View>
              </View>
              <View style={styles.feedItem}>
                 <View style={styles.feedDot} />
                 <View style={styles.feedContent}>
                    <Text style={styles.feedTitle}>Joined Green City Initiative</Text>
                    <Text style={styles.feedMeta}>Yesterday • 10:00 AM</Text>
                 </View>
              </View>
           </View>
        </View>

        <Button 
          mode="text" 
          textColor="#EF4444" 
          style={styles.logoutBtn}
          labelStyle={{ fontWeight: '910', fontSize: 16 }}
          onPress={() => api.logout()}
        >
          Sign Out of Hub
        </Button>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 40, // Master Rhythm
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
  profileBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18, // Premium Pills
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
    marginBottom: 40, // Master Rhythm
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#F8F9FA',
    borderWidth: 4,
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
    width: 34,
    height: 34,
    borderRadius: 18, // Premium Icon Box Radius
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
    marginBottom: 40, // Master Rhythm
  },
  impactCard: {
    backgroundColor: '#1A1C1E',
    borderRadius: 35, // Master Premium Radius
    padding: 24, // Consistent Internal Padding
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
    borderRadius: 18, // Master Icon Box Radius
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
    borderRadius: 35, // Master Premium Radius
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
    marginBottom: 40, // Master Rhythm
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  gridBtn: {
    width: (SCREEN_WIDTH - 63) / 2,
    backgroundColor: '#FFFFFF',
    padding: 24, // Consistent Internal Padding
    borderRadius: 35, // Master Premium Radius
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },
  gridIcon: {
    width: 48,
    height: 48,
    borderRadius: 18, // Master Icon Box Radius
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  feedSection: {
    paddingHorizontal: 24,
    marginBottom: 40, // Master Rhythm
  },
  feedContainer: {
    marginTop: 10,
  },
  feedItem: {
    flexDirection: 'row',
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
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 10,
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
  logoutBtn: {
    marginBottom: 40,
  }
});
