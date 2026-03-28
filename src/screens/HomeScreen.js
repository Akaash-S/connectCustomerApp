import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, StatusBar, TextInput } from 'react-native';
import { Text, Card, Avatar, IconButton, useTheme, Button, Divider, Badge, Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { id: '1', title: 'Request Help', icon: 'hand-heart', color: '#FFF1F2', route: 'RequestHelp' },
  { id: '2', title: 'Find NGOs', icon: 'office-building', color: '#F0F9FF', route: 'NGOs' },
  { id: '3', title: 'Volunteer', icon: 'account-group', color: '#F0FDF4', route: 'NGOs' },
  { id: '4', title: 'Impact Events', icon: 'calendar-star', color: '#FFF7ED', route: 'Events' },
];

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  
  const [user, setUser] = useState({ fullName: 'Akash', avatarUrl: null });
  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [featuredNGOs, setFeaturedNGOs] = useState([]);
  const [stats, setStats] = useState({ volunteers: 0, ngos: 0 });
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, reqData, ngoData, statsData, activityData] = await Promise.allSettled([
          api.getUserProfile(),
          api.getRequests(5),
          api.getNGOs(5),
          api.getUserStats(),
          api.getUserActivity()
        ]);
        
        if (profile.status === 'fulfilled') setUser(profile.value);
        if (reqData.status === 'fulfilled' && reqData.value.length > 0) setNearbyRequests(reqData.value);
        if (ngoData.status === 'fulfilled' && ngoData.value.length > 0) setFeaturedNGOs(ngoData.value);
        if (statsData.status === 'fulfilled') setStats({ volunteers: statsData.value.volunteers || 1200, ngos: statsData.value.ngos || 45 });
        if (activityData.status === 'fulfilled' && activityData.value.length > 0) setActivities(activityData.value);
      } catch (error) {
        console.warn("API Error (Home):", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const renderSectionHeader = (title, linkText, onPress) => (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.sectionLink}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingHeader}>Hello, {user.fullName.split(' ')[0]}</Text>
            <Text style={styles.welcomeSub}>Ready to connect?</Text>
          </View>
          <TouchableOpacity 
            style={styles.notifIconPill}
            onPress={() => navigation.navigate('Notifications')}
          >
            <MaterialCommunityIcons name="bell-outline" size={24} color="#1A1C1E" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR (STREAKY) */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
            <TextInput 
              placeholder="Search NGOs, events, or help..." 
              style={styles.searchInput}
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* QUICK ACTIONS GRID */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.gridContainer}>
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.actionCard, { backgroundColor: action.color }]}
                onPress={() => navigation.navigate(action.route)}
              >
                <View style={styles.actionIconPill}>
                  <MaterialCommunityIcons name={action.icon} size={24} color="#1A1C1E" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* COMMUNITY VITALITY STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statPill}>
             <MaterialCommunityIcons name="broadcast" size={14} color="#10B981" />
             <Text style={styles.statText}>{stats.volunteers} Online Now</Text>
          </View>
          <View style={styles.statPill}>
             <MaterialCommunityIcons name="check-decagram" size={14} color="#3B82F6" />
             <Text style={styles.statText}>{stats.ngos} Verified Partners</Text>
          </View>
        </View>

        {/* VERIFIED PARTNERS (Horizontal Scroll) */}
        {renderSectionHeader("Verified Partners", "+ See all", () => navigation.navigate('NGOs'))}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ngoScroll}>
          {featuredNGOs.length > 0 ? featuredNGOs.map(ngo => (
            <TouchableOpacity 
              key={ngo.id} 
              style={styles.ngoCard}
              onPress={() => navigation.navigate('NGOs', { screen: 'NGODetails', params: { ngoId: ngo.id } })}
            >
              <View style={styles.ngoAvatarContainer}>
                <Text style={styles.ngoInitials}>{ngo.initials || ngo.name.substring(0, 1)}</Text>
              </View>
              <Text style={styles.ngoName} numberOfLines={1}>{ngo.name}</Text>
              <View style={styles.verificationBadge}>
                 <MaterialCommunityIcons name="check-circle" size={12} color="#3B82F6" />
                 <Text style={styles.verificationText}>Partner</Text>
              </View>
            </TouchableOpacity>
          )) : (
            <View style={styles.emptyCardSmall}>
              <Text style={styles.emptyTextSmall}>No Data</Text>
            </View>
          )}
        </ScrollView>

        {/* URGENT REQUESTS (Like Your Cards) */}
        {renderSectionHeader("Urgent Requests", "+ See all", () => navigation.navigate('Reports'))}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsList}>
          {nearbyRequests.length > 0 ? nearbyRequests.map((item, index) => (
             <TouchableOpacity 
              key={item.id}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Reports', { screen: 'RequestDetails', params: { requestId: item.id } })}
             >
                <View style={[styles.neoCard, { backgroundColor: index % 2 === 0 ? '#C1E1C1' : '#E0E7FF' }]}>
                  <View style={styles.cardPattern}>
                    <Text style={styles.cardPatternText}>CONNECT</Text>
                  </View>
                  <View style={styles.cardTop}>
                    <View style={styles.cardCircleIcon}>
                       <MaterialCommunityIcons name="hand-heart" size={20} color="#1A1C1E" />
                    </View>
                    <MaterialCommunityIcons name="circle-double" size={32} color="rgba(0,0,0,0.1)" />
                  </View>
                  <View style={styles.cardBottom}>
                    <View>
                      <Text style={styles.cardLabel}>{item.category || 'Help'}</Text>
                      <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                    </View>
                    <View style={styles.cardDetailsBtn}>
                      <MaterialCommunityIcons name="eye-outline" size={16} color="#1A1C1E" />
                      <Text style={styles.cardDetailsText}>Details</Text>
                    </View>
                  </View>
                </View>
             </TouchableOpacity>
          )) : (
            <View style={[styles.neoCard, { backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' }]}>
               <MaterialCommunityIcons name="database-off-outline" size={40} color="#94A3B8" />
               <Text style={styles.emptyCardText}>No Data</Text>
            </View>
          )}
        </ScrollView>

        {/* COMMUNITY ACTIVITY */}
        {renderSectionHeader("Community Activity", "See all", () => navigation.navigate('Reports'))}
        <View style={styles.activityList}>
          {activities.length > 0 ? activities.map(act => (
            <TouchableOpacity 
              key={act.id} 
              style={styles.activityItem}
              onPress={() => {
                if (act.type === 'REQUEST') navigation.navigate('Reports', { screen: 'RequestDetails', params: { requestId: act.relatedId } });
                else if (act.type === 'EVENT') navigation.navigate('Home', { screen: 'EventDetails', params: { eventId: act.relatedId } });
              }}
              activeOpacity={0.7}
            >
              <View style={styles.activityIconCircle}>
                <MaterialCommunityIcons 
                  name={act.type === 'REQUEST' ? 'hand-heart' : 'calendar-star'} 
                  size={24} 
                  color="#1A1C1E" 
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{act.title}</Text>
                <Text style={styles.activityTime}>{act.timeAgo || 'Just now'}</Text>
              </View>
              <View style={styles.activityImpact}>
                <Text style={styles.impactPoints}>+{act.points || 10} pts</Text>
                <MaterialCommunityIcons name="star-four-points" size={14} color="#10B981" />
              </View>
            </TouchableOpacity>
          )) : (
            <View style={styles.emptyActivity}>
              <MaterialCommunityIcons name="history" size={40} color="#F1F5F9" />
              <Text style={styles.emptyActivityText}>No Data</Text>
            </View>
          )}
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  greetingHeader: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  welcomeSub: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '600',
  },
  notifIconPill: {
    width: 44,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  notifDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 28,
    paddingHorizontal: 20,
    height: 56,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    marginTop: 25,
    marginBottom: 25,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (SCREEN_WIDTH - 48 - 12) / 2,
    padding: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  actionIconPill: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1A1C1E',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 35,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1A1C1E',
    textTransform: 'uppercase',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  sectionLink: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '700',
  },
  ngoScroll: {
    paddingLeft: 24,
    paddingRight: 10,
    marginBottom: 35,
  },
  ngoCard: {
    width: 100,
    alignItems: 'center',
    marginRight: 20,
  },
  ngoAvatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1A1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  ngoInitials: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  ngoName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: 4,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verificationText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#3B82F6',
    textTransform: 'uppercase',
  },
  cardsList: {
    paddingLeft: 24,
    paddingRight: 10,
    marginBottom: 40,
  },
  neoCard: {
    width: 280,
    height: 180,
    borderRadius: 35,
    padding: 24,
    marginRight: 14,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardPattern: {
    position: 'absolute',
    top: 20,
    right: -20,
    opacity: 0.1,
    transform: [{ rotate: '-45deg' }],
  },
  cardPatternText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCircleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1C1E',
    marginTop: 2,
    maxWidth: 150,
  },
  cardDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  cardDetailsText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  activityList: {
    paddingHorizontal: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  activityIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  activityContent: {
    flex: 1,
    marginLeft: 16,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '600',
  },
  activityImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  impactPoints: {
    fontSize: 14,
    fontWeight: '900',
    color: '#10B981',
  },
  emptyCardText: {
    marginTop: 10,
    color: '#94A3B8',
    fontWeight: '700',
  },
  emptyCardSmall: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyTextSmall: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyActivity: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 35,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E2E8F0',
    marginTop: 10,
  },
  emptyActivityText: {
    color: '#94A3B8',
    fontWeight: '800',
    fontSize: 14,
    marginTop: 12,
  }
});
