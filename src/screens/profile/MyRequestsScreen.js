import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, StatusBar, TextInput, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../../services/api';

const CATEGORIES = ['All', 'Medical', 'Food', 'Disaster', 'Education', 'Other'];

export const MyRequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const data = await api.getMyRequests();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching my requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#F59E0B';
      case 'ASSIGNED': return '#3B82F6';
      case 'COMPLETED': return '#10B981';
      case 'URGENT': return '#EF4444';
      default: return '#94A3B8';
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && r.category === activeCategory;
  });

  const renderRequestItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('RequestDetails', { requestId: item.id })}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
           <Text style={styles.categoryText}>{item.category || 'Help'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status || 'ACTIVE'}</Text>
        </View>
      </View>
      
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={16} color="#94A3B8" />
          <Text style={styles.metaText}>{item.location || 'Chennai'}</Text>
        </View>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#94A3B8" />
          <Text style={styles.metaText}>{new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
       <ProfileSubScreenWrapper 
          title="My Requests" 
          subtitle="Support requests you created" 
          navigation={navigation}
        >
          {/* SEARCH BAR (HUB CONSISTENT) */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
              <TextInput 
                placeholder="Search your requests..." 
                style={styles.searchInput}
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* CATEGORY CHIPS */}
          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
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
            <View style={styles.loader}>
              <ActivityIndicator color="#1A1C1E" />
            </View>
          ) : (
            <FlatList
              data={filteredRequests}
              renderItem={renderRequestItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons name="database-off-outline" size={60} color="#F1F5F9" />
                  <Text style={styles.emptyText}>No Data</Text>
                </View>
              }
            />
          )}
        </ProfileSubScreenWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    marginBottom: 20,
    marginTop: 10,
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
  categoryContainer: {
    marginBottom: 25,
  },
  categoryScroll: {
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
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
  loader: {
    padding: 100,
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 20,
    lineHeight: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#1A1C1E',
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    marginTop: 20,
    color: '#94A3B8',
    fontWeight: '800',
    fontSize: 16,
  }
});
