import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, useTheme, Button, IconButton, Avatar, Card, Divider, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const GALLERY = [
  'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
];

export const EventDetailsScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Top Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800' }} 
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
              <Text variant="displaySmall" style={styles.eventTitle}>Beach Cleanup Drive</Text>
              <View style={styles.hostRow}>
                <Avatar.Text size={24} label="GE" style={{ backgroundColor: theme.colors.primary }} />
                <Text variant="titleMedium" style={styles.hostName}>Hosted by Green Earth NGO</Text>
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
              <Text variant="titleSmall" style={styles.infoValue}>25 Mar</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="clock-outline" size={18} color="#0369A1" />
            <View style={styles.infoTextContainer}>
              <Text variant="labelSmall" style={styles.infoLabel}>TIME</Text>
              <Text variant="titleSmall" style={styles.infoValue}>7:00 AM</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="map-marker" size={18} color="#166534" />
            <View style={styles.infoTextContainer}>
              <Text variant="labelSmall" style={styles.infoLabel}>PLACE</Text>
              <Text variant="titleSmall" style={styles.infoValue}>Marina</Text>
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
              <View>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Marina Beach, Chennai</Text>
                <Text variant="bodySmall" style={{ color: '#6B7280' }}>2.1 km away</Text>
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
            Join us for a community beach cleanup to help reduce plastic pollution and protect marine life. 
            We provide all the tools, bags, and gloves. It's a great way to meet fellow nature lovers 
            and make a real impact on our coastline!
          </Text>
        </View>

        {/* Event Statistics */}
        <View style={styles.section}>
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text variant="titleMedium" style={styles.statsTitle}>Volunteer Progress</Text>
              <Text variant="titleMedium" style={styles.statsProgress}>25 / 50 Joined</Text>
            </View>
            <ProgressBar progress={0.5} color="#BBF7D0" style={styles.statLine} />
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

        <View style={{ height: 40 }} />
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
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 35, // Added margin for better look
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  joinActionBtn: {
    borderRadius: 20,
    height: 56, // Explicit height to match contentStyle
    justifyContent: 'center',
  }
});
