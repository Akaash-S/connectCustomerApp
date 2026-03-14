import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MenuItem = ({ title, icon, color, onPress, badgeCount }) => {
  const theme = useTheme();
  return (
    <List.Item
      title={title}
      titleStyle={styles.menuTitle}
      left={props => (
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
      )}
      right={props => (
        <View style={styles.rightContainer}>
          {badgeCount > 0 && (
            <View style={[styles.badge, { backgroundColor: color }]}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
          )}
          <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
        </View>
      )}
      onPress={onPress}
      style={styles.listItem}
    />
  );
};

export const ActivityMenu = ({ onNavigate, stats }) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionHeader}>My Activities</Text>
      <View style={styles.menuCard}>
        <MenuItem 
          title="My Requests" 
          icon="clipboard-text-outline" 
          color="#6366F1" 
          onPress={() => onNavigate('Reports')} 
          badgeCount={stats.activeRequests}
        />
        <Divider style={styles.divider} />
        <MenuItem 
          title="My Requests" 
          icon="clipboard-text-outline" 
          color="#6366F1" 
          onPress={() => onNavigate('Reports')} 
          badgeCount={stats.activeRequests}
        />
        <Divider style={styles.divider} />
        <MenuItem 
          title="Saved NGOs" 
          icon="bookmark-outline" 
          color="#F59E0B" 
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#F9FAFB',
    height: 1,
    marginHorizontal: 16,
  }
});
