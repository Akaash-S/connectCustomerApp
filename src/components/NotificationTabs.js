import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

export const NotificationTabs = ({ activeTab, onTabChange }) => {
  const tabs = ['All', 'Requests', 'Events', 'NGOs', 'System'];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onTabChange(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24, // Internal Rhythm
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20, // Premium Tabs
    backgroundColor: '#F8F9FA',
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  activeTab: {
    backgroundColor: '#1A1C1E',
    borderColor: '#1A1C1E',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '910',
  },
});
