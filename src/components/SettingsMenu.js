import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MenuItem = ({ title, icon, color, onPress }) => (
  <List.Item
    title={title}
    titleStyle={styles.menuTitle}
    left={props => (
      <View style={[styles.iconContainer, { backgroundColor: '#F3F4F6' }]}>
        <MaterialCommunityIcons name={icon} size={22} color="#4B5563" />
      </View>
    )}
    right={props => <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />}
    onPress={onPress}
    style={styles.listItem}
  />
);

export const SettingsMenu = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionHeader}>Account Settings</Text>
      <View style={styles.menuCard}>
        <MenuItem title="Edit Profile" icon="account-outline" onPress={() => onNavigate('EditProfile')} />
        <Divider style={styles.divider} />
        <MenuItem title="Notifications" icon="bell-outline" onPress={() => {}} />
        <Divider style={styles.divider} />
        <MenuItem title="Privacy" icon="shield-lock-outline" onPress={() => {}} />
        <Divider style={styles.divider} />
        <MenuItem title="Location" icon="map-marker-outline" onPress={() => {}} />
        <Divider style={styles.divider} />
        <MenuItem title="Language" icon="translate" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  listItem: {
    paddingVertical: 6,
  },
  menuTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: '#344054',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  divider: {
    backgroundColor: '#F9FAFB',
    height: 1,
    marginHorizontal: 16,
  }
});
