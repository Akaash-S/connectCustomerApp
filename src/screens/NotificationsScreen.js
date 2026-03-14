import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, SectionList } from 'react-native';
import { Text, IconButton, useTheme, Button, Badge } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Components
import { NotificationCard } from '../components/NotificationCard';
import { NotificationTabs } from '../components/NotificationTabs';
import { NotificationEmptyState } from '../components/NotificationEmptyState';

const DUMMY_NOTIFICATIONS = [
  {
    id: '1',
    title: '🤝 Volunteer Assigned',
    description: 'A volunteer has accepted your request for beach cleanup assistance.',
    time: '5 minutes ago',
    type: 'Requests',
    read: false,
    date: 'Today'
  },
  {
    id: '2',
    title: '📅 Event Reminder',
    description: 'Beach Cleanup Drive starts tomorrow at Marina Beach.',
    time: '2 hours ago',
    type: 'Events',
    read: false,
    date: 'Today'
  },
  {
    id: '3',
    title: '🌱 Green Earth NGO',
    description: 'New event posted: Tree Plantation Drive.',
    time: '1 day ago',
    type: 'NGOs',
    read: true,
    date: 'Yesterday'
  },
  {
    id: '4',
    title: '📩 Request Update',
    description: 'Your request has been marked as "In Progress".',
    time: '2 days ago',
    type: 'Requests',
    read: true,
    date: 'Earlier'
  },
  {
    id: '5',
    title: '🎉 Welcome to CONNECT',
    description: 'Thank you for joining our community of changemakers!',
    time: '4 days ago',
    type: 'System',
    read: true,
    date: 'Earlier'
  }
];

export const NotificationsScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);

  const filteredNotifications = notifications.filter(n => 
    activeTab === 'All' || n.type === activeTab
  );

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((acc, item) => {
    const section = acc.find(s => s.title === item.date);
    if (section) {
      section.data.push(item);
    } else {
      acc.push({ title: item.date, data: [item] });
    }
    return acc;
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleNotificationPress = (item) => {
    setNotifications(notifications.map(n => n.id === item.id ? { ...n, read: true } : n));
    
    // Navigation logic
    if (item.type === 'Requests') navigation.navigate('MyRequests');
    else if (item.type === 'Events') navigation.navigate('JoinedEvents');
    else if (item.type === 'NGOs') navigation.navigate('NGOs');
  };

  const MeshBackground = () => (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF9F0' }]}>
      <View style={[styles.blob, { top: -100, right: -50, backgroundColor: 'rgba(217, 119, 6, 0.08)', width: 300, height: 300 }]} />
      <View style={[styles.blob, { bottom: -100, left: -50, backgroundColor: 'rgba(16, 185, 129, 0.08)', width: 300, height: 300 }]} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MeshBackground />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <View style={styles.headerTop}>
          <IconButton 
            icon="arrow-left" 
            mode="contained" 
            containerColor="#FFF" 
            size={24}
            onPress={() => navigation.goBack()} 
          />
          <Text variant="headlineSmall" style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 48 }} /> 
        </View>
        
        <View style={styles.headerActions}>
          <Button 
            mode="text" 
            onPress={markAllRead} 
            labelStyle={styles.actionLabel}
            icon="check-all"
          >
            Mark all as read
          </Button>
          <Button 
            mode="text" 
            onPress={clearAll} 
            labelStyle={[styles.actionLabel, { color: '#EF4444' }]}
            icon="delete-sweep-outline"
          >
            Clear all
          </Button>
        </View>
      </View>

      <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {filteredNotifications.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <SectionList
          sections={groupedNotifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => (
            <NotificationCard 
              item={item} 
              onPress={() => handleNotificationPress(item)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <View style={styles.sectionLine} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  blob: {
    position: 'absolute',
    borderRadius: 200,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Increased to clear tab bar
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginRight: 15,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  }
});
