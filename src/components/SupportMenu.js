import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, Text, Button } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MenuItem = ({ title, icon, onPress }) => (
  <TouchableOpacity 
    style={styles.menuItemContainer} 
    onPress={onPress}
    activeOpacity={1}
  >
    <View style={styles.menuItemLeft}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={22} color="#9CA3AF" />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
  </TouchableOpacity>
);

export const SupportMenu = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionHeader}>Support</Text>
      <View style={styles.menuCard}>
        <MenuItem title="Help Center" icon="help-circle-outline" onPress={() => {}} />
        <Divider style={styles.divider} />
        <MenuItem title="Report a Problem" icon="alert-circle-outline" onPress={() => {}} />
        <Divider style={styles.divider} />
        <MenuItem title="Terms & Conditions" icon="file-document-outline" onPress={() => {}} />
        <Divider style={styles.divider} />
        <MenuItem title="Privacy Policy" icon="lock-outline" onPress={() => {}} />
        <Divider style={styles.divider} />
        <MenuItem title="About CONNECT" icon="information-outline" onPress={() => {}} />
      </View>

      <TouchableOpacity activeOpacity={1} style={styles.logoutBtn}>
        <MaterialCommunityIcons name="logout" size={20} color="#FFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
    marginBottom: 40,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#4B5563',
    marginLeft: 15,
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#F9FAFB',
    height: 1,
    marginHorizontal: 16,
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
