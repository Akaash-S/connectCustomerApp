import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Text, Searchbar, Card, Avatar, IconButton, useTheme, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

export const NGOsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
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
      activeOpacity={0.8}
      onPress={() => navigation.navigate('NGODetails', { ngoId: item.id })}
      style={styles.ngoCard}
    >
      <View style={styles.cardHeader}>
        <Avatar.Text 
          size={56} 
          label={item.initials || item.name.substring(0, 2).toUpperCase()} 
          style={{ backgroundColor: item.color || '#10B981' }} 
        />
        <View style={styles.ngoInfo}>
          <Text style={styles.ngoName}>{item.name}</Text>
          <Text style={styles.ngoLocation}>📍 {item.location || 'Chennai, India'}</Text>
        </View>
        <IconButton icon="chevron-right" size={24} iconColor="#D1D5DB" />
      </View>
      <View style={styles.impactRow}>
        <View style={styles.impactBadge}>
           <MaterialCommunityIcons name="star" size={12} color="#D97706" />
           <Text style={styles.impactText}>{item.impact || 'Verified'}</Text>
        </View>
        <Text style={styles.volunteersCount}>{item.volunteersCount || '12'} Active Volunteers</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find NGOs</Text>
        <Text style={styles.headerSub}>Support organizations near you</Text>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search by name or category..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#94A3B8"
          inputStyle={styles.searchInput}
        />
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color="#1A1C1E" />
        </View>
      ) : (
        <FlatList
          data={ngos.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={renderNGOItem}
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
    marginBottom: 20,
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchBar: {
    backgroundColor: '#F8F9FA',
    borderRadius: 18,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    height: 52,
  },
  searchInput: {
    fontSize: 14,
    fontWeight: '500',
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
  ngoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 20,
    marginBottom: 16,
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
    alignItems: 'center',
  },
  ngoInfo: {
    flex: 1,
    marginLeft: 16,
  },
  ngoName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  ngoLocation: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '600',
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  impactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  volunteersCount: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
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
