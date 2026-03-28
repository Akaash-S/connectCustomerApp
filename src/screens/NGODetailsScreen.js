import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const PRIMARY_DARK = '#1A1C1E';
const ACCENT_BLUE = '#3B82F6';
const GHOST_WHITE = '#F8F9FA';

export const NGODetailsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { ngoId } = route.params || {};

  const [ngo, setNgo] = useState(null);
  const [activeEvents, setActiveEvents] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ngoId) return;
    const fetchDetails = async () => {
      try {
        const data = await api.getNGODetails(ngoId);
        if (data) {
          setNgo(data);
          if (data.activeEvents) {
            setActiveEvents(data.activeEvents);
          }
        }
      } catch (error) {
        console.warn("API Error (NGODetails):", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [ngoId]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={PRIMARY_DARK} />
      </View>
    );
  }

  if (!ngo) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="office-building-marker-outline" size={60} color="#F1F5F9" />
        <Text style={styles.emptyText}>NGO Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* HERO BANNER HUB */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: ngo.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800' }} style={styles.bannerImage} />
          <View style={styles.bannerOverlay}>
            <View style={[styles.bannerTop, { paddingTop: insets.top + 10 }]}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.bannerBottom}>
              <View style={styles.verifiedBadge}>
                <MaterialCommunityIcons name="check-decagram" size={14} color="#FFF" />
                <Text style={styles.verifiedText}>Verified NGO Partner</Text>
              </View>
              <Text style={styles.ngoName}>{ngo.name}</Text>
              <Text style={styles.ngoMeta}>{ngo.category || 'Non-Profit'} • {ngo.location || 'Chennai, India'}</Text>
            </View>
          </View>
        </View>

        {/* STATISTICS HUB */}
        <View style={styles.statsHub}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{ngo.volunteerCount || '0'}</Text>
            <Text style={styles.statLabel}>Volunteers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{ngo.projectCount || '0'}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{activeEvents.length}</Text>
            <Text style={styles.statLabel}>Live Events</Text>
          </View>
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.hubSection}>
          <Text style={styles.sectionLabel}>The Mission</Text>
          <Text style={styles.sectionTitle}>Archival Vision</Text>
          <Text style={styles.aboutText}>{ngo.description || 'No description available.'}</Text>
        </View>

        {/* ACTIVE INITIATIVES HUB */}
        <View style={styles.hubSection}>
          <View style={styles.sectionHeaderLine}>
            <View>
              <Text style={styles.sectionLabel}>The Frontline</Text>
              <Text style={styles.sectionTitle}>Live Initiatives</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {activeEvents.length > 0 ? activeEvents.map(event => (
            <TouchableOpacity 
               key={event.id} 
               style={styles.eventHubCard} 
               activeOpacity={0.9}
               onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
            >
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventMetaRow}>
                   <MaterialCommunityIcons name="calendar-clock" size={14} color={ACCENT_BLUE} />
                   <Text style={styles.eventMetaText}>{event.date || 'TBD'} • {event.location || 'Chennai'}</Text>
                </View>
              </View>
              <View style={styles.eventGoBtn}>
                 <MaterialCommunityIcons name="arrow-right" size={20} color={PRIMARY_DARK} />
              </View>
            </TouchableOpacity>
          )) : (
            <View style={styles.emptyCard}>
               <Text style={styles.emptyCardText}>No active initiatives at this moment.</Text>
            </View>
          )}
        </View>

        {/* MONOLITHIC ACTION HUB (SAME LAYER) */}
        <View style={styles.actionSection}>
           <TouchableOpacity 
              style={[styles.followBtn, isFollowing && styles.followingBtn]} 
              onPress={() => setIsFollowing(!isFollowing)}
              activeOpacity={0.9}
           >
              <Text style={[styles.followText, isFollowing && styles.followingText]}>
                 {isFollowing ? "Archived in My Network" : "Partner with this NGO"}
              </Text>
              <View style={[styles.btnIconBox, isFollowing && { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                 <MaterialCommunityIcons 
                    name={isFollowing ? "check-circle" : "plus-circle-outline"} 
                    size={20} 
                    color={isFollowing ? PRIMARY_DARK : "#FFF"} 
                 />
              </View>
           </TouchableOpacity>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  bannerContainer: {
    height: 480,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 24,
    justifyContent: 'space-between',
  },
  bannerTop: {
    flexDirection: 'row',
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bannerBottom: {
    paddingBottom: 50,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  verifiedText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '910',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ngoName: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '910',
    letterSpacing: -1,
  },
  ngoMeta: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  statsHub: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: -40,
    backgroundColor: '#FFFFFF',
    borderRadius: 35, // Premium Hub Radius
    padding: 28,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '1000',
    color: PRIMARY_DARK,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F1F5F9',
  },
  hubSection: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '910',
    color: PRIMARY_DARK,
    letterSpacing: -0.5,
    marginBottom: 18,
  },
  aboutText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 25,
    fontWeight: '600',
  },
  sectionHeaderLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '910',
    color: ACCENT_BLUE,
    marginTop: 20,
  },
  eventHubCard: {
    backgroundColor: GHOST_WHITE,
    borderRadius: 32, // Proper Rounded Corners
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '910',
    color: PRIMARY_DARK,
    marginBottom: 6,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventMetaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  eventGoBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyCard: {
    backgroundColor: GHOST_WHITE,
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderStyle: 'dashed',
  },
  emptyCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  actionSection: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  followBtn: {
    backgroundColor: PRIMARY_DARK,
    height: 75,
    borderRadius: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    elevation: 12,
    shadowColor: PRIMARY_DARK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  followingBtn: {
    backgroundColor: GHOST_WHITE,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowOpacity: 0,
  },
  followText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '910',
    letterSpacing: 0.5,
  },
  followingText: {
    color: PRIMARY_DARK,
  },
  btnIconBox: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '900',
    color: '#94A3B8',
  }
});
