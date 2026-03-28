import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Text, Divider, Button, ProgressBar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY_DARK = '#1A1C1E';
const ACCENT_BLUE = '#3B82F6';
const ACCENT_EMERALD = '#10B981';
const GHOST_WHITE = '#F8F9FA';

export const EventDetailsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { eventId } = route.params || {};

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    const fetchDetails = async () => {
      try {
        const data = await api.getEventDetails(eventId);
        if (data) {
          setEvent(data);
        }
      } catch (error) {
        console.warn("API Error (EventDetails):", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [eventId]);

  const handleJoinEvent = async () => {
    setIsJoining(true);
    try {
      const success = await api.joinEvent(eventId);
      if (success) {
        setEvent(prev => ({ 
          ...prev, 
          volunteersJoined: (prev.volunteersJoined || 0) + 1,
          isJoined: true 
        }));
        Alert.alert("Impact Registered", "You are now officially part of this community initiative.");
      }
    } catch (error) {
      Alert.alert("Registration Failed", "Unable to sync your participation with the Hub.");
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={PRIMARY_DARK} />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="calendar-remove-outline" size={60} color="#F1F5F9" />
        <Text style={styles.emptyText}>Event Not Found</Text>
      </View>
    );
  }

  const progress = (event.volunteersJoined || 0) / (event.volunteersNeeded || 50);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {/* HERO BANNER HUB */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: event.bannerImage || 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800' }} style={styles.bannerImage} />
          <View style={styles.bannerOverlay}>
            <View style={[styles.bannerTop, { paddingTop: insets.top + 10 }]}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                <MaterialCommunityIcons name="chevron-left" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.bannerBottom}>
              <View style={styles.trendingBadge}>
                <Text style={styles.trendingText}>🔥 Community Impact Target</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.hostRow}>
                 <View style={styles.miniAvatar}>
                    <Text style={styles.avatarText}>{(event.hostName || 'NGO').substring(0, 1)}</Text>
                 </View>
                 <Text style={styles.hostName}>Initiated by {event.hostName || 'Community NGO'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* LOGISTICS ROLL */}
        <View style={styles.logisticsHub}>
          <View style={styles.logisticItem}>
            <MaterialCommunityIcons name="calendar-range" size={20} color="#F59E0B" />
            <View style={styles.logisticLabelGroup}>
               <Text style={styles.logLabel}>TIMELINE</Text>
               <Text style={styles.logValue}>{event.date || 'TBD'}</Text>
            </View>
          </View>
          <View style={styles.logDivider} />
          <View style={styles.logisticItem}>
            <MaterialCommunityIcons name="clock-check-outline" size={20} color="#3B82F6" />
            <View style={styles.logisticLabelGroup}>
               <Text style={styles.logLabel}>EXECUTION</Text>
               <Text style={styles.logValue}>{event.time || 'TBD'}</Text>
            </View>
          </View>
        </View>

        {/* PERIMETER CARD */}
        <View style={styles.perimeterCard}>
           <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600' }} style={styles.mapVisual} />
           <View style={styles.mapFooter}>
              <MaterialCommunityIcons name="map-marker-radius" size={24} color={ACCENT_BLUE} />
              <View style={{ flex: 1 }}>
                 <Text style={styles.locationTitle}>{event.location || 'Reported Location'}</Text>
                 <Text style={styles.locationSub}>Strategic Perimeter</Text>
              </View>
              <TouchableOpacity style={styles.navHubBtn}>
                 <Text style={styles.navHubText}>NAVIGATE HUB</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* MISSION ARCHIVE */}
        <View style={styles.hubSection}>
           <Text style={styles.sectionLabel}>The Mission</Text>
           <Text style={styles.sectionTitle}>Strategic Objectives</Text>
           <Text style={styles.aboutText}>{event.description}</Text>
        </View>

        {/* IMPACT PROGRESS HUB */}
        <View style={styles.impactHub}>
           <View style={styles.impactHeader}>
              <View>
                 <Text style={styles.impactTitle}>Community Force</Text>
                 <Text style={styles.impactSub}>{event.volunteersJoined || 0} / {event.volunteersNeeded || 50} Strategic Units Joined</Text>
              </View>
              <View style={styles.impactBadge}>
                 <Text style={styles.impactBadgeText}>⭐ HIGH IMPACT</Text>
              </View>
           </View>
           <ProgressBar progress={progress} color={ACCENT_EMERALD} style={styles.progressBar} />
           <View style={styles.impactFooter}>
              <Text style={styles.forceGainText}>+{(event.volunteersNeeded || 50) * 10} Potential Community Points</Text>
           </View>
        </View>

        {/* MONOLITHIC JOIN ACTION (SAME LAYER) */}
        <View style={styles.actionSection}>
           <TouchableOpacity 
              style={[styles.joinBtn, event.isJoined && styles.joinedBtn, isJoining && { opacity: 0.8 }]} 
              onPress={handleJoinEvent}
              activeOpacity={0.9}
              disabled={event.isJoined || isJoining}
           >
              {isJoining ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                   <Text style={[styles.joinText, event.isJoined && styles.joinedText]}>
                      {event.isJoined ? "Participation Verified" : "Join This Strategic Initiative"}
                   </Text>
                   <View style={[styles.btnIconBox, event.isJoined && { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                      <MaterialCommunityIcons 
                         name={event.isJoined ? "check-decagram" : "shield-plus-outline"} 
                         size={20} 
                         color={event.isJoined ? PRIMARY_DARK : "#FFF"} 
                      />
                   </View>
                </>
              )}
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
    height: 520,
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
    paddingBottom: 60,
  },
  trendingBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  trendingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '910',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  eventTitle: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: '910',
    letterSpacing: -1.5,
    lineHeight: 40,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 12,
  },
  miniAvatar: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
  },
  hostName: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '700',
  },
  logisticsHub: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: -45,
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
    justifyContent: 'space-between',
  },
  logisticItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logisticLabelGroup: {
    justifyContent: 'center',
  },
  logLabel: {
    fontSize: 9,
    fontWeight: '910',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  logValue: {
    fontSize: 14,
    fontWeight: '1000',
    color: PRIMARY_DARK,
    marginTop: 2,
  },
  logDivider: {
    width: 1,
    height: 35,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 15,
  },
  perimeterCard: {
    marginHorizontal: 24,
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 35, // Proper Rounded Corners
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  mapVisual: {
    width: '100%',
    height: 180,
  },
  mapFooter: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '910',
    color: PRIMARY_DARK,
  },
  locationSub: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 2,
  },
  navHubBtn: {
    backgroundColor: PRIMARY_DARK,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  navHubText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '910',
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
  impactHub: {
    marginHorizontal: 24,
    marginTop: 40,
    backgroundColor: PRIMARY_DARK,
    borderRadius: 35, // Premium Hub Radius
    padding: 28,
  },
  impactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: '910',
    color: '#FFFFFF',
  },
  impactSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    fontWeight: '700',
  },
  impactBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  impactBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '910',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  impactFooter: {
    marginTop: 20,
    alignItems: 'center',
  },
  forceGainText: {
    fontSize: 12,
    fontWeight: '910',
    color: ACCENT_EMERALD,
    letterSpacing: 0.5,
  },
  actionSection: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  joinBtn: {
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
  joinedBtn: {
    backgroundColor: GHOST_WHITE,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowOpacity: 0,
  },
  joinText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '910',
    letterSpacing: 0.5,
  },
  joinedText: {
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
