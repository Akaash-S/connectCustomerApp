import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface, Divider, TextInput } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const SecurityPrivacyScreens = ({ route, navigation }) => {
  const { type } = route.params || { type: 'Security' };

  const renderSecurity = () => (
    <View style={styles.card}>
      <Text style={styles.subHeader}>Security Methods</Text>
      <SecurityItem title="Google Account" subtitle="Linked to: akash@example.com" icon="google" color="#DB4437" />
      <Divider style={styles.divider} />
      <SecurityItem title="Device Sessions" subtitle="2 active sessions" icon="cellphone-link" color="#3B82F6" />
      
      <Text style={styles.subHeader}>Account Actions</Text>
      <TouchableOpacity style={styles.dangerItem} activeOpacity={1}>
        <View style={styles.dangerLeft}>
          <MaterialCommunityIcons name="account-remove-outline" size={24} color="#EF4444" />
          <Text style={styles.dangerText}>Delete Account</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
      </TouchableOpacity>
    </View>
  );

  const renderPrivacy = () => (
    <View style={styles.card}>
      <Text style={styles.subHeader}>Profile Visibility</Text>
      <VisibilityItem title="Public" subtitle="Everyone can see your activity" icon="earth" selected />
      <VisibilityItem title="Private" subtitle="Only NGOs you request can see" icon="lock-outline" />
      <VisibilityItem title="Friends Only" subtitle="Visible to approved connections" icon="account-group-outline" />
      
      <Text style={styles.subHeader}>Activity History</Text>
      <TouchableOpacity style={styles.actionBtn} activeOpacity={1}>
        <Text style={styles.actionBtnText}>Clear Search History</Text>
      </TouchableOpacity>
    </View>
  );

  const SecurityItem = ({ title, subtitle, icon, color }) => (
    <TouchableOpacity style={styles.item} activeOpacity={1}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
    </TouchableOpacity>
  );

  const VisibilityItem = ({ title, subtitle, icon, selected }) => (
    <TouchableOpacity style={styles.visibilityItem} activeOpacity={1}>
      <MaterialCommunityIcons name={icon} size={24} color={selected ? "#D97706" : "#9CA3AF"} />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={[styles.itemTitle, selected && { color: '#D97706' }]}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>
      {selected && <MaterialCommunityIcons name="check-circle" size={22} color="#D97706" />}
    </TouchableOpacity>
  );

  return (
    <ProfileSubScreenWrapper title={type} navigation={navigation}>
      {type === 'Security' ? renderSecurity() : renderPrivacy()}
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    overflow: 'hidden',
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  subHeader: {
    padding: 15,
    fontSize: 11,
    fontWeight: '900',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
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
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 15,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
  },
  dangerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  dangerText: {
    fontWeight: '900',
    color: '#EF4444',
  },
  visibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  actionBtn: {
    padding: 20,
    alignItems: 'center',
  },
  actionBtnText: {
    fontWeight: '900',
    color: '#3B82F6',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  }
});
