import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, StatusBar, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Avatar, Divider, Badge } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const CATEGORIES = ['All', 'Medical', 'Food', 'Disaster', 'Education', 'Environment', 'Other'];

export const RequestsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleVote = async (requestId) => {
    try {
      const result = await api.voteRequest(requestId);
      // Update local state to show the new vote count
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, votes: result.votes } : req
      ));
    } catch (error) {
      console.warn("Vote failed:", error);
    }
  };

  const renderRequestItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('RequestDetails', { requestId: item.id })}
      style={styles.requestCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.categoryInfo}>
           <Text style={styles.categoryLabel}>{item.category || 'COMMUNITY NEED'}</Text>
           <Text style={styles.requestTitle} numberOfLines={2}>{item.title}</Text>
        </View>
        <TouchableOpacity 
           style={styles.highlightBtn}
           onPress={() => handleVote(item.id)}
        >
           <MaterialCommunityIcons name="arrow-up-bold-outline" size={24} color="#3B82F6" />
           <Text style={styles.voteCount}>{item.votes || 0}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={16} color="#94A3B8" />
          <Text style={styles.metaText}>{item.location || 'Chennai'}</Text>
          <View style={styles.metaDivider} />
          <MaterialCommunityIcons name="clock-outline" size={16} color="#94A3B8" />
          <Text style={styles.metaText}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.statusPill}>
           <View style={[styles.statusDot, { backgroundColor: item.status === 'URGENT' ? '#EF4444' : '#10B981' }]} />
           <Text style={[styles.statusText, { color: item.status === 'URGENT' ? '#EF4444' : '#10B981' }]}>{item.status || 'Active'}</Text>
        </View>
        <TouchableOpacity style={styles.supportLink} onPress={() => navigation.navigate('RequestDetails', { requestId: item.id })}>
           <Text style={styles.supportLinkText}>Support this</Text>
           <MaterialCommunityIcons name="heart-flash" size={18} color="#E11D48" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      <FlatList
        data={requests}
        renderItem={renderRequestItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* INTEGRATED SINGLE-LAYER HEADER */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>Support Hub</Text>
                <Text style={styles.headerSub}>Highlight and support peer needs</Text>
              </View>
              <TouchableOpacity style={styles.notifIconPill}>
                <MaterialCommunityIcons name="bell-outline" size={24} color="#1A1C1E" />
                <Badge size={8} style={styles.badge} />
              </TouchableOpacity>
            </View>

            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBox}>
                 <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
                 <TextInput 
                   placeholder="Search for community reports..." 
                   style={styles.searchInput}
                   placeholderTextColor="#94A3B8"
                   value={searchQuery}
                   onChangeText={setSearchQuery}
                 />
              </View>
            </View>

            {/* CATEGORY CHIPS */}
            <View style={styles.categoryWrapper}>
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
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator color="#1A1C1E" size="large" />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="database-off-outline" size={60} color="#F1F5F9" />
              <Text style={styles.emptyText}>No Active Support Needed</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 25,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  notifIconPill: {
    width: 48,
    height: 48,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#EF4444',
  },
  listContent: {
    paddingBottom: 100,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    height: 60,
    borderRadius: 28,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  categoryWrapper: {
    marginBottom: 25,
  },
  categoryScroll: {
    paddingHorizontal: 24,
    gap: 12,
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
    fontSize: 13,
    fontWeight: '900',
    color: '#64748B',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 24,
    marginBottom: 20,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '910',
    color: '#1A1C1E',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  highlightBtn: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  voteCount: {
    fontSize: 12,
    fontWeight: '910',
    color: '#3B82F6',
    marginTop: 2,
  },
  cardBody: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '900',
  },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  supportLinkText: {
    fontSize: 14,
    fontWeight: '910',
    color: '#E11D48',
  },
  loader: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyState: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '800',
    color: '#CBD5E1',
  }
});
