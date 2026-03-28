import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import { Text, Avatar, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const CATEGORIES = ['All', 'Medical', 'Food', 'Education', 'Environment', 'Animal Welfare'];

export const NGOsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [ngos, setNgos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const data = await api.getNGOs();
        setNgos(data);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNGOs();
  }, []);

  const renderNGOItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('NGODetails', { ngoId: item.id })}
      style={styles.ngoCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarCircle}>
           <Text style={styles.avatarText}>{item.initials || item.name.substring(0, 1).toUpperCase()}</Text>
        </View>
        <View style={styles.ngoInfo}>
          <Text style={styles.ngoName}>{item.name}</Text>
          <View style={styles.locationRow}>
             <MaterialCommunityIcons name="map-marker-outline" size={14} color="#94A3B8" />
             <Text style={styles.ngoLocation}>{item.location || 'Chennai, India'}</Text>
          </View>
        </View>
        <View style={styles.verifyBadge}>
           <MaterialCommunityIcons name="check-decagram" size={24} color="#3B82F6" />
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.statPill}>
          <MaterialCommunityIcons name="heart-multiple-outline" size={16} color="#64748B" />
          <Text style={styles.statText}>{item.volunteersCount || '15'} Initiatives</Text>
        </View>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('NGODetails', { ngoId: item.id })}>
           <Text style={styles.actionBtnText}>Explore Partner</Text>
           <MaterialCommunityIcons name="arrow-right" size={16} color="#1A1C1E" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      <FlatList
        data={ngos}
        renderItem={renderNGOItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* INTEGRATED SINGLE-LAYER HEADER */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>Partner Hub</Text>
                <Text style={styles.headerSub}>Empowering community heroes</Text>
              </View>
              <TouchableOpacity 
                 style={styles.notifIconPill} 
                 onPress={() => navigation.navigate('Notifications')}
                 activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="bell-outline" size={24} color="#1A1C1E" />
                <View style={styles.activeDot} />
              </TouchableOpacity>
            </View>

            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBox}>
                <MaterialCommunityIcons name="magnify" size={24} color="#94A3B8" />
                <TextInput 
                  placeholder="Search partners..." 
                  style={styles.searchInput}
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* CATEGORY CHIPS */}
            <View style={styles.categoryWrapper}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.categoryScroll}
              >
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
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="office-building-marker-outline" size={60} color="#F1F5F9" />
              <Text style={styles.emptyText}>No Partners Found</Text>
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
    marginBottom: 40, // Uniform Rhythm
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
  activeDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 100,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 40, // Uniform Rhythm
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
    marginBottom: 40, // Uniform Rhythm
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
  loader: {
    marginTop: 100,
    alignItems: 'center',
  },
  ngoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35, // Premium Radius
    padding: 24, // Consistent Internal Padding
    marginHorizontal: 24,
    marginBottom: 20,
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
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 18, // Premium Icon Box Radius
    backgroundColor: '#1A1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '910',
  },
  ngoInfo: {
    flex: 1,
    marginLeft: 18,
  },
  ngoName: {
    fontSize: 20,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ngoLocation: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '700',
  },
  verifyBadge: {
    marginLeft: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24, // Unified Internal Padding
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 8,
  },
  statText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748B',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '910',
    color: '#1A1C1E',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    marginTop: 20,
    color: '#CBD5E1',
    fontWeight: '800',
    fontSize: 16,
  }
});
