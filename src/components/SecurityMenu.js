import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MenuItem = ({ title, icon, color, onPress }) => (
  <TouchableOpacity 
    style={styles.menuItemContainer} 
    onPress={onPress}
    activeOpacity={1}
  >
    <View style={styles.menuItemLeft}>
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
  </TouchableOpacity>
);

export const SecurityMenu = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionHeader}>Security & Privacy</Text>
      <View style={styles.menuCard}>
        <MenuItem title="Privacy Settings" icon="shield-check-outline" color="#10B981" onPress={() => onNavigate('SecurityPrivacy', { type: 'Privacy' })} />
        <Divider style={styles.divider} />
        <MenuItem title="Account Security" icon="lock-outline" color="#EF4444" onPress={() => onNavigate('SecurityPrivacy', { type: 'Security' })} />
        <Divider style={styles.divider} />
        <MenuItem title="Data Permissions" icon="database-lock-outline" color="#3B82F6" onPress={() => {}} />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#374151',
    marginLeft: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#F9FAFB',
    height: 1,
    marginHorizontal: 16,
  }
});
