import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, useTheme, Button, IconButton, Avatar, Card, Divider, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const { width } = Dimensions.get('window');

const GALLERY = [
  'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
];

export const EventDetailsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { eventId } = route.params || {};

  const [event, setEvent] = useState({
    title: 'Loading Event...',
    hostName: 'Loading NGO...',
    date: '-',
    time: '-',
    location: 'Loading...',
    description: 'Fetching event details...',
    volunteersJoined: 0,
    volunteersNeeded: 1,
    bannerImage: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
    isJoined: false
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    const fetchDetails = async () => {
      try {
        const data = await api.getEventDetails(eventId);
        if (data) {
          setEvent({
            title: data.title,
            hostName: data.hostName || 'Community NGO',
            date: data.date || (data.eventDate ? new Date(data.eventDate).toLocaleDateString() : 'TBD'),
            time: data.time || (data.eventDate ? new Date(data.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD'),
            location: data.location,
            description: data.description,
            volunteersJoined: data.volunteersJoined || 0,
            volunteersNeeded: data.volunteersNeeded || 50,
            bannerImage: data.bannerImage || 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
            isJoined: false
          });
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
          volunteersJoined: prev.volunteersJoined + 1,
          isJoined: true 
        }));
      }
    } catch (error) {
      console.warn("API Error (JoinEvent):", error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Top Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: event.bannerImage }} 
            style={styles.bannerImage} 
          />
          <View style={styles.bannerOverlay}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-left" size={28} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.bannerBottom}>
              <View style={styles.trendingBadge}>
                <Text style={styles.trendingText}>🔥 Trending Event</Text>
              </View>
              <Text variant="displaySmall" style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.hostRow}>
                <Avatar.Text size={24} label={event.hostName.substring(0,2).toUpperCase()} style={{ backgroundColor: theme.colors.primary }} />
                <Text variant="titleMedium" style={styles.hostName}>Hosted by {event.hostName}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Event Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="calendar" size={18} color="#D97706" />
            <View style={styles.infoTextContainer}>
              <Text variant="labelSmall" style={styles.infoLabel}>DATE</Text>
              <Text variant="titleSmall" style={styles.infoValue}>{event.date}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="clock-outline" size={18} color="#0369A1" />
            <View style={styles.infoTextContainer}>
              <Text variant="labelSmall" style={styles.infoLabel}>TIME</Text>
              <Text variant="titleSmall" style={styles.infoValue}>{event.time}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="map-marker" size={18} color="#166534" />
            <View style={styles.infoTextContainer}>
              <Text variant="labelSmall" style={styles.infoLabel}>PLACE</Text>
              <Text variant="titleSmall" style={styles.infoValue}>{event.location.split(',')[0]}</Text>
            </View>
          </View>
        </View>

        {/* Map & Join Section */}
        <View style={styles.section}>
          <Card style={styles.mapCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600' }} 
              style={styles.mapImage} 
            />
            <View style={styles.mapOverlay}>
              <View style={styles.mapPointer}>
                <MaterialCommunityIcons name="map-marker-radius" size={28} color={theme.colors.secondary} />
              </View>
            </View>
            <View style={styles.mapFooter}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{event.location}</Text>
                <Text variant="bodySmall" style={{ color: '#6B7280' }}>Nearby</Text>
              </View>
              <IconButton 
                icon="directions" 
                mode="contained" 
                containerColor={theme.colors.secondary} 
                iconColor="#FFF" 
                size={20} 
              />
            </View>
          </Card>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>About this Event</Text>
          <Text variant="bodyMedium" style={styles.aboutText}>
            {event.description}
          </Text>
        </View>

        {/* Event Statistics */}
        <View style={styles.section}>
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text variant="titleMedium" style={styles.statsTitle}>Volunteer Progress</Text>
              <Text variant="titleMedium" style={styles.statsProgress}>{event.volunteersJoined} / {event.volunteersNeeded} Joined</Text>
            </View>
            <ProgressBar 
              progress={event.volunteersJoined / (event.volunteersNeeded || 1)} 
              color="#BBF7D0" 
              style={styles.statLine} 
            />
            <View style={styles.impactRow}>
              <View style={styles.impactBadge}>
                <Text style={styles.impactText}>⭐ High Impact</Text>
              </View>
              <Text variant="labelSmall" style={styles.impactDesc}>+50 Impact Points</Text>
            </View>
          </View>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
            {GALLERY.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.galleryImage} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Button 
            mode="contained" 
            onPress={handleJoinEvent} 
            loading={isJoining}
            disabled={event.isJoined}
            style={styles.joinActionBtn}
            contentStyle={{ height: 56 }}
          >
            {event.isJoined ? 'REGISTERED' : 'JOIN THIS EVENT'}
          </Button>
        </View>

        <View style={{ height: 160 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  scroll: {
    flex: 1,
  },
  bannerContainer: {
    height: 480,
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bannerBottom: {
    paddingBottom: 20,
  },
  trendingBadge: {
    backgroundColor: 'rgba(217, 119, 6, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  trendingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventTitle: {
    color: '#FFF',
    fontWeight: '900',
    lineHeight: 42,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  hostName: {
    color: '#F3F4F6',
    marginLeft: 8,
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -30,
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoTextContainer: {
    justifyContent: 'center',
  },
  infoLabel: {
    color: '#9CA3AF',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#1A1C1E',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontWeight: '900',
    marginBottom: 12,
    fontSize: 18,
    color: '#1A1C1E',
  },
  mapCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  mapImage: {
    height: 140,
    width: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  mapPointer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  mapFooter: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapJoinBtn: {
    borderRadius: 12,
    height: 36,
  },
  aboutText: {
    color: '#4B5563',
    lineHeight: 24,
  },
  statsCard: {
    backgroundColor: '#1E4D2B',
    borderRadius: 24,
    padding: 20,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsTitle: {
    color: '#BBF7D0',
    fontWeight: 'bold',
  },
  statsProgress: {
    color: '#FFF',
    fontWeight: '900',
  },
  statLine: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  impactBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  impactText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  impactDesc: {
    color: '#BBF7D0',
    fontWeight: 'bold',
  },
  galleryScroll: {
    marginTop: 5,
  },
  galleryImage: {
    width: 180,
    height: 120,
    borderRadius: 20,
    marginRight: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 90, // Above 80px custom tab bar
    left: 20,
    right: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinActionBtn: {
    borderRadius: 20,
    height: 56, // Explicit height to match contentStyle
    justifyContent: 'center',
  }
});
