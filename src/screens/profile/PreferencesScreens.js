import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Surface, IconButton, Divider } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const PreferencesScreens = ({ route, navigation }) => {
  const { type } = route.params || { type: 'Notifications' };

  const renderNotifications = () => (
    <View style={styles.section}>
      <PreferenceItem title="Event Notifications" subtitle="New events near you" icon="bell-badge-outline" color="#3B82F6" />
      <PreferenceItem title="Volunteer Request Updates" subtitle="Track progress of your requests" icon="clipboard-pulse-outline" color="#10B981" />
      <PreferenceItem title="NGO Announcements" subtitle="Updates from saved NGOs" icon="bullhorn-outline" color="#F59E0B" />
      <PreferenceItem title="Community Updates" subtitle="Monthly impact reports" icon="account-group-outline" color="#8B5CF6" />
    </View>
  );

  const renderLocation = () => (
    <View style={styles.section}>
      <PreferenceItem title="Use GPS" subtitle="Automatic location detection" icon="crosshairs-gps" color="#D97706" />
      <Divider style={styles.divider} />
      <View style={styles.sliderSection}>
        <Text style={styles.label}>Location Radius</Text>
        <Text style={styles.value}>25 KM</Text>
        <View style={styles.placeholderSlider} />
      </View>
      <PreferenceItem title="Default Location" subtitle="Chennai, India" icon="map-marker-check-outline" color="#10B981" />
    </View>
  );

  const renderLanguageTheme = () => (
    <View style={styles.section}>
      <Text style={styles.subHeader}>Language</Text>
      <SelectionItem title="English" selected />
      <SelectionItem title="Tamil" />
      <SelectionItem title="Hindi" />
      
      <Divider style={styles.divider} />
      
      <Text style={styles.subHeader}>App Theme</Text>
      <SelectionItem title="Light Mode" />
      <SelectionItem title="Dark Mode" />
      <SelectionItem title="System Default" selected />
    </View>
  );

  const PreferenceItem = ({ title, subtitle, icon, color }) => {
    const [enabled, setEnabled] = useState(true);
    return (
      <TouchableOpacity style={styles.item} onPress={() => setEnabled(!enabled)}>
        <View style={styles.itemLeft}>
          <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
            <MaterialCommunityIcons name={icon} size={22} color={color} />
          </View>
          <View>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <MaterialCommunityIcons 
          name={enabled ? "toggle-switch" : "toggle-switch-off"} 
          size={44} 
          color={enabled ? "#10B981" : "#D1D5DB"} 
        />
      </TouchableOpacity>
    );
  };

  const SelectionItem = ({ title, selected }) => (
    <TouchableOpacity style={styles.selectionItem}>
      <Text style={[styles.selectionText, selected && styles.selectionTextActive]}>{title}</Text>
      {selected && <MaterialCommunityIcons name="check-circle" size={24} color="#D97706" />}
    </TouchableOpacity>
  );

  return (
    <ProfileSubScreenWrapper title={type} navigation={navigation}>
      {type === 'Notifications' && renderNotifications()}
      {type === 'Location' && renderLocation()}
      {type === 'Language' || type === 'Theme' ? renderLanguageTheme() : null}
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    overflow: 'hidden',
    padding: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: '#1F2937',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  subHeader: {
    padding: 15,
    fontSize: 11,
    fontWeight: '900',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  selectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  selectionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  selectionTextActive: {
    color: '#D97706',
    fontWeight: '900',
  },
  divider: {
    height: 2,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
  sliderSection: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1F2937',
  },
  value: {
    fontSize: 24,
    fontWeight: '900',
    color: '#D97706',
    marginTop: 5,
  },
  placeholderSlider: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginTop: 20,
    overflow: 'hidden',
  }
});
