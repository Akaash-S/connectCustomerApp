import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, SectionList, StatusBar, ActivityIndicator } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Components
import { NotificationCard } from '../components/NotificationCard';
import { NotificationTabs } from '../components/NotificationTabs';
import { NotificationEmptyState } from '../components/NotificationEmptyState';
import { api } from '../services/api';

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
  }
];

export const NotificationsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await api.getUserActivity();
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id || Math.random().toString(),
            title: item.title || item.action,
            description: item.description || `Activity logged: ${item.action}`,
            time: item.date || 'Just now',
            type: item.type || 'System',
            read: true,
            date: 'Live'
          }));
          setNotifications(mapped);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.warn("API Error (Notifications):", error);
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivity();
  }, []);

  const filteredNotifications = notifications.filter(n => 
    activeTab === 'All' || n.type === activeTab
  );

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
    if (item.type === 'Requests') navigation.navigate('MyRequests');
    else if (item.type === 'Events') navigation.navigate('JoinedEvents');
    else if (item.type === 'NGOs') navigation.navigate('NGOs');
  };

  const CustomHeader = () => (
    <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerTop}>
           <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <MaterialCommunityIcons name="chevron-left" size={32} color="#1A1C1E" />
           </TouchableOpacity>
           
           <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Activity</Text>
              <Text style={styles.headerSub}>Community pulses</Text>
           </View>

           <View style={styles.headerSpacer} />
        </View>
        
        <View style={styles.actionHub}>
          <TouchableOpacity onPress={markAllRead} style={styles.actionBtn}>
             <MaterialCommunityIcons name="check-all" size={16} color="#3B82F6" />
             <Text style={styles.actionText}>Read All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearAll} style={styles.actionBtn}>
             <MaterialCommunityIcons name="delete-sweep-outline" size={16} color="#E11D48" />
             <Text style={[styles.actionText, { color: '#E11D48' }]}>Clear</Text>
          </TouchableOpacity>
       </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader />
      
      <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {isLoading ? (
        <View style={styles.loader}>
           <ActivityIndicator color="#1A1C1E" />
        </View>
      ) : filteredNotifications.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <SectionList
          sections={groupedNotifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loader: {
    padding: 100,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F8F9FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  headerSub: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
  actionHub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  actionText: {
    fontSize: 11,
    fontWeight: '910',
    color: '#3B82F6',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40, // Master Rhythm
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginRight: 16,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F5F9',
  }
});
