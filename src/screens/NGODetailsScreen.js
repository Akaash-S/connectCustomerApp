import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Text, useTheme, Button, IconButton, Avatar, Card, Divider } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ACTIVE_EVENTS = [
  { id: '1', title: 'Beach Cleanup Drive', date: '25 March', location: 'Marina Beach' },
  { id: '2', title: 'Urban Garden Planting', date: '02 April', location: 'Guindy Park' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
];

export const NGODetailsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800' }} 
          style={styles.bannerImage} 
        />
        <View style={styles.bannerOverlay}>
          <View style={styles.bannerTop}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-left" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.bannerBottom}>
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check-decagram" size={14} color="#FFF" />
              <Text style={styles.verifiedText}>Verified NGO</Text>
            </View>
            <Text variant="displaySmall" style={styles.ngoName}>Green Earth Foundation</Text>
            <Text variant="titleMedium" style={styles.ngoMeta}>Environment NGO • Chennai, India</Text>
          </View>
        </View>
      </View>

      {/* NGO Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text variant="headlineSmall" style={[styles.statValue, { color: theme.colors.primary }]}>1200</Text>
          <Text variant="labelSmall" style={styles.statLabel}>Volunteers</Text>
        </View>
        <Divider style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text variant="headlineSmall" style={[styles.statValue, { color: theme.colors.primary }]}>45</Text>
          <Text variant="labelSmall" style={styles.statLabel}>Projects</Text>
        </View>
        <Divider style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text variant="headlineSmall" style={[styles.statValue, { color: theme.colors.primary }]}>12</Text>
          <Text variant="labelSmall" style={styles.statLabel}>Active Events</Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>About NGO</Text>
        <Text variant="bodyMedium" style={styles.aboutText}>
          Green Earth Foundation works on environmental sustainability through large-scale tree plantation drives, 
          coastal cleanup programs, and community awareness workshops. Founded in 2015, we aim to restore 10,000 
          hectares of green cover across southern India.
        </Text>
      </View>

      {/* Active Events */}
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Active Events</Text>
          <TouchableOpacity><Text style={{ color: theme.colors.secondary, fontWeight: 'bold' }}>View All</Text></TouchableOpacity>
        </View>
        {ACTIVE_EVENTS.map(event => (
          <Card key={event.id} style={styles.eventCard}>
            <View style={styles.eventContent}>
              <View style={styles.eventInfo}>
                <Text variant="titleMedium" style={styles.eventTitle}>{event.title}</Text>
                <Text variant="bodySmall" style={styles.eventMetaText}>📅 {event.date} • 📍 {event.location}</Text>
              </View>
              <Button mode="contained" buttonColor={theme.colors.secondary} style={styles.eventBtn}>View</Button>
            </View>
          </Card>
        ))}
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

      {/* Interaction Footer */}
      <View style={styles.footer}>
        <Button 
          mode={isFollowing ? "outlined" : "contained"} 
          buttonColor={isFollowing ? "transparent" : theme.colors.primary}
          onPress={() => setIsFollowing(!isFollowing)}
          style={styles.followBtn}
          contentStyle={{ height: 56 }}
        >
          {isFollowing ? "Following" : "Follow NGO"}
        </Button>
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  bannerContainer: {
    height: 450,
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
  bannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingBottom: 40, // Increased to account for stat overlap
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 119, 6, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  verifiedText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  ngoName: {
    color: '#FFF',
    fontWeight: '900',
  },
  ngoMeta: {
    color: '#F3F4F6',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -35,
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 24,
    elevation: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontWeight: '900',
  },
  statLabel: {
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#F3F4F6',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontWeight: '900',
    marginBottom: 15,
  },
  aboutText: {
    color: '#4B5563',
    lineHeight: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventCard: {
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  eventContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontWeight: 'bold',
  },
  eventMetaText: {
    color: '#6B7280',
    marginTop: 2,
  },
  eventBtn: {
    borderRadius: 12,
  },
  galleryScroll: {
    marginTop: 10,
  },
  galleryImage: {
    width: 150,
    height: 100,
    borderRadius: 16,
    marginRight: 10,
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 40,
    paddingBottom: 20,
  },
  followBtn: {
    borderRadius: 18,
  }
});
