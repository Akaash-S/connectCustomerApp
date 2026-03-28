import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Text, Searchbar, Chip, Avatar, useTheme, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const CATEGORIES = ['All', 'Medical', 'Food', 'Disaster', 'Education', 'Other'];

export const RequestsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await api.getRequests();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const renderRequestItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('RequestDetails', { requestId: item.id })}
      style={styles.requestCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.categoryInfo}>
           <Text style={styles.categoryLabel}>{item.category || 'Help Needed'}</Text>
           <Text style={styles.requestTitle} numberOfLines={2}>{item.title}</Text>
        </View>
        <Avatar.Icon 
          size={48} 
          icon={item.category === 'Medical' ? 'medical-bag' : 'hand-heart'} 
          style={styles.requestIcon} 
          color="#1A1C1E"
        />
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#94A3B8" />
          <Text style={styles.metaText}>{item.timePosted || 'Recent'}</Text>
          <View style={styles.metaDivider} />
          <MaterialCommunityIcons name="map-marker-outline" size={16} color="#94A3B8" />
          <Text style={styles.metaText}>{item.location || 'Chennai'}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.statusIndicator}>
           <View style={[styles.statusDot, { backgroundColor: item.status === 'Urgent' ? '#EF4444' : '#10B981' }]} />
           <Text style={styles.statusText}>{item.status || 'Active'}</Text>
        </View>
        <TouchableOpacity style={styles.detailsBtn} onPress={() => navigation.navigate('RequestDetails', { requestId: item.id })}>
           <Text style={styles.detailsBtnText}>View Details</Text>
           <MaterialCommunityIcons name="arrow-right" size={16} color="#1A1C1E" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Activity</Text>
        <Text style={styles.headerSub}>Real-time updates from your area</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryChip, activeCategory === cat && styles.activeChip]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.chipText, activeCategory === cat && styles.activeChipText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color="#1A1C1E" />
        </View>
      ) : (
        <FlatList
          data={activeCategory === 'All' ? requests : requests.filter(r => r.category === activeCategory)}
          renderItem={renderRequestItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="database-off-outline" size={60} color="#F1F5F9" />
              <Text style={styles.emptyText}>No Data</Text>
            </View>
          }
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  headerSub: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
  filterContainer: {
    marginBottom: 25,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  activeChip: {
    backgroundColor: '#1A1C1E',
    borderColor: '#1A1C1E',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 10,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1C1E',
    lineHeight: 24,
  },
  requestIcon: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
  },
  cardBody: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1A1C1E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 20,
    color: '#94A3B8',
    fontWeight: '600',
  }
});
