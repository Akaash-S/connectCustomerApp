import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MenuItem = ({ title, icon, color, onPress }) => (
  <List.Item
    title={title}
    titleStyle={styles.menuTitle}
    left={props => (
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
      </View>
    )}
    right={props => <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />}
    onPress={onPress}
    style={styles.listItem}
  />
);

export const ReportsMenu = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionHeader}>Requests & Reports</Text>
      <View style={styles.menuCard}>
        <MenuItem 
          title="Request Reports" 
          icon="file-chart-outline" 
          color="#F43F5E" 
          onPress={() => onNavigate('Reports')} 
        />
        <Divider style={styles.divider} />
        <MenuItem 
          title="Volunteer Completion Reports" 
          icon="check-decagram-outline" 
          color="#8B5CF6" 
          onPress={() => {}} 
        />
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
    paddingVertical: 8,
  },
  menuTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#344054',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
