import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, useTheme, Button, IconButton, Divider, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const REQUEST_TIMELINE = [
  { id: '1', title: 'Request Submitted', date: '15 March, 10:30 AM', status: 'completed', icon: 'file-document-edit' },
  { id: '2', title: 'Volunteer Assigned', date: '15 March, 02:45 PM', status: 'completed', icon: 'account-check' },
  { id: '3', title: 'In Progress', date: '16 March, 09:15 AM', status: 'active', icon: 'progress-clock' },
  { id: '4', title: 'Verification', date: 'Pending', status: 'upcoming', icon: 'shield-check' },
  { id: '5', title: 'Completed', date: 'Pending', status: 'upcoming', icon: 'check-decagram' },
];

export const RequestDetailsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  
  const request = {
    title: 'Grocery Help for Senior Citizen',
    category: 'Essential Supplies',
    icon: 'basket-outline',
    location: 'Velachery, Chennai',
    distance: '1.2 km from you',
    date: '15 March 2026',
    time: '10:00 AM - 12:00 PM',
    description: 'Need assistance with weekly grocery shopping for an elderly couple living alone. They need basic supplies from the local market as they are unable to walk long distances.',
    status: 'In Progress',
    statusColor: '#3B82F6',
    evidenceImages: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
      'https://images.unsplash.com/photo-1574630810574-cfa585d799b7?w=400',
      'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400'
    ],
    assignedVolunteer: {
      name: 'Ravi Kumar',
      rating: 4.8,
      completed: 124,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    }
  };

  const renderTimelineItem = (item, index) => {
    const isActive = item.status === 'active';
    const isCompleted = item.status === 'completed';
    
    return (
      <View key={item.id} style={styles.timelineItem}>
        <View style={styles.timelineLeft}>
          <View style={[
            styles.timelineIcon, 
            { backgroundColor: isCompleted ? '#10B981' : isActive ? theme.colors.primary : '#F3F4F6' }
          ]}>
            <MaterialCommunityIcons 
              name={isCompleted ? 'check' : item.icon} 
              size={18} 
              color={isCompleted || isActive ? '#FFF' : '#9CA3AF'} 
            />
          </View>
          {index !== REQUEST_TIMELINE.length - 1 && (
            <View style={[
              styles.timelineConnector,
              { backgroundColor: isCompleted ? '#10B981' : '#E5E7EB' }
            ]} />
          )}
        </View>
        <View style={styles.timelineRight}>
          <Text variant="titleSmall" style={[styles.timelineTitle, isActive && { color: theme.colors.primary }]}>
            {item.title}
          </Text>
          <Text variant="labelSmall" style={styles.timelineDate}>{item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Overlay */}
      <View style={styles.header}>
        <IconButton 
          icon="arrow-left" 
          size={24} 
          onPress={() => navigation.goBack()} 
          containerColor="rgba(255,255,255,0.9)"
          iconColor="#1A1C1E"
        />
        <Text variant="titleLarge" style={styles.headerTitle}>Help Request</Text>
        <IconButton icon="share-variant-outline" size={24} iconColor="#1A1C1E" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* 1. Main Info Hero */}
        <Card style={styles.heroCard}>
          <View style={styles.cardPadding}>
            <View style={styles.topRow}>
              <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary + '15' }]}>
                <MaterialCommunityIcons name={request.icon} size={16} color={theme.colors.primary} />
                <Text style={[styles.categoryText, { color: theme.colors.primary }]}>{request.category}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: request.statusColor + '15' }]}>
                <Text style={[styles.statusLabel, { color: request.statusColor }]}>{request.status}</Text>
              </View>
            </View>

            <Text variant="headlineSmall" style={styles.mainTitle}>{request.title}</Text>
            
            <View style={styles.metaGrid}>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons name="calendar-clock" size={20} color="#6B7280" />
                <View>
                  <Text variant="labelSmall" style={styles.metaLabel}>DATE & TIME</Text>
                  <Text variant="bodySmall" style={styles.metaValue}>{request.date} • {request.time}</Text>
                </View>
              </View>
            </View>

            <Divider style={styles.divider} />
            
            <Text variant="titleSmall" style={styles.sectionLabel}>DESCRIPTION</Text>
            <Text variant="bodyMedium" style={styles.description}>{request.description}</Text>
          </View>
        </Card>

        {/* 2. Map Preview Section */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Help Location</Text>
          <Card style={styles.mapCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600' }} 
              style={styles.mapImage} 
            />
            <View style={styles.mapFooter}>
              <MaterialCommunityIcons name="map-marker-radius" size={24} color={theme.colors.secondary} />
              <View style={styles.mapText}>
                <Text variant="titleSmall">{request.location}</Text>
                <Text variant="bodySmall" style={{ color: '#6B7280' }}>{request.distance}</Text>
              </View>
              <Button mode="contained-tonal" compact labelStyle={{ fontSize: 10 }}>NAVIGATE</Button>
            </View>
          </Card>
        </View>

        {/* 3. Media Evidence Gallery */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Request Evidence</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.evidenceGallery}>
            {request.evidenceImages.map((img, index) => (
              <TouchableOpacity key={index}>
                <Image source={{ uri: img }} style={styles.evidenceImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 4. Progress Timeline */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Live Progress</Text>
          <Card style={styles.timelineCard}>
            <View style={styles.cardPadding}>
              {REQUEST_TIMELINE.map((item, index) => renderTimelineItem(item, index))}
            </View>
          </Card>
        </View>

        {/* 5. Assigned Volunteer */}
        {request.assignedVolunteer && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Assigned Volunteer</Text>
            <Card style={styles.volunteerCard}>
              <View style={styles.volunteerContent}>
                <Avatar.Image size={60} source={{ uri: request.assignedVolunteer.avatar }} />
                <View style={styles.volunteerText}>
                  <Text variant="titleLarge" style={styles.volunteerName}>{request.assignedVolunteer.name}</Text>
                  <View style={styles.ratingRow}>
                    <MaterialCommunityIcons name="star" size={16} color="#F59E0B" />
                    <Text variant="labelMedium" style={styles.ratingText}>{request.assignedVolunteer.rating} • {request.assignedVolunteer.completed} Tasks</Text>
                  </View>
                </View>
              </View>
              <Divider style={styles.volunteerDivider} />
              <View style={styles.volunteerActions}>
                <Button 
                  mode="outlined" 
                  icon="message-text-outline" 
                  style={styles.actionBtn}
                  textColor={theme.colors.primary}
                >Message</Button>
                <Button 
                  mode="contained" 
                  icon="phone-outline" 
                  style={styles.actionBtn}
                  buttonColor={theme.colors.primary}
                >Call Volunteer</Button>
              </View>
            </Card>
          </View>
        )}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  scrollContent: {
    paddingTop: 110,
  },
  heroCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 36,
    backgroundColor: '#FFF',
    elevation: 8,
    shadowColor: '#1E4D2B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  cardPadding: {
    padding: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 20,
  },
  metaGrid: {
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  metaLabel: {
    color: '#9CA3AF',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  metaValue: {
    color: '#344054',
    fontWeight: '600',
  },
  divider: {
    marginVertical: 24,
    backgroundColor: '#F3F4F6',
  },
  sectionLabel: {
    fontWeight: '900',
    color: '#9CA3AF',
    marginBottom: 10,
    fontSize: 12,
    letterSpacing: 1,
  },
  description: {
    color: '#4B5563',
    lineHeight: 24,
    fontSize: 15,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontWeight: '900',
    marginBottom: 15,
    color: '#1A1C1E',
    fontSize: 18,
  },
  mapCard: {
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    elevation: 4,
  },
  mapImage: {
    height: 150,
    width: '100%',
  },
  mapFooter: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mapText: {
    flex: 1,
  },
  evidenceGallery: {
    flexDirection: 'row',
  },
  evidenceImage: {
    width: 140,
    height: 100,
    borderRadius: 20,
    marginRight: 15,
  },
  timelineCard: {
    borderRadius: 28,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 70,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 20,
  },
  timelineIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    marginVertical: -5,
  },
  timelineRight: {
    flex: 1,
    paddingBottom: 25,
  },
  timelineTitle: {
    fontWeight: '800',
    fontSize: 16,
  },
  timelineDate: {
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '600',
  },
  volunteerCard: {
    borderRadius: 32,
    backgroundColor: '#FFF',
    elevation: 4,
    overflow: 'hidden',
  },
  volunteerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  volunteerText: {
    flex: 1,
    marginLeft: 20,
  },
  volunteerName: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  ratingText: {
    color: '#6B7280',
    fontWeight: 'bold',
    fontSize: 12,
  },
  volunteerDivider: {
    backgroundColor: '#F9FAFB',
  },
  volunteerActions: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
    backgroundColor: '#F9FAFB',
  },
  actionBtn: {
    flex: 1,
    borderRadius: 16,
  }
});
