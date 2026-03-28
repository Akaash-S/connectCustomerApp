import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Surface, SegmentedButtons } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const NGOsData = [
  { id: '1', name: 'Green Earth NGO', category: 'Environment', icon: 'leaf' },
  { id: '2', name: 'EduCare India', category: 'Education', icon: 'school' },
];

const SavedItem = ({ item }) => (
  <TouchableOpacity activeOpacity={1}>
    <Surface style={styles.card} elevation={2}>
    <View style={styles.itemLeft}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={item.icon} size={28} color="#D97706" />
      </View>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.viewBtn}>
      <Text style={styles.viewBtnText}>View NGO</Text>
    </TouchableOpacity>
      </Surface>
  </TouchableOpacity>
);

export const SavedItemsScreen = ({ navigation }) => {
  const [value, setValue] = React.useState('ngos');

  return (
    <ProfileSubScreenWrapper title="Saved & Favorites" navigation={navigation}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          { value: 'ngos', label: 'Saved NGOs' },
          { value: 'events', label: 'Saved Events' },
        ]}
        style={styles.segments}
        theme={{ colors: { primary: '#D97706', secondaryContainer: '#D9770620' } }}
      />
      
      <View style={styles.list}>
        {value === 'ngos' ? (
          NGOsData.map(item => <SavedItem key={item.id} item={item} />)
        ) : (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="bookmark-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No saved events yet</Text>
          </View>
        )}
      </View>
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  segments: {
    marginBottom: 20,
  },
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  itemCategory: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
  },
  viewBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D97706',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 14,
  },
  viewBtnText: {
    color: '#D97706',
    fontWeight: '900',
    fontSize: 11,
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#9CA3AF',
    fontWeight: '700',
    marginTop: 15,
  }
});
