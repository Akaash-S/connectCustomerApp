import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Surface, Divider, TextInput, Button } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const SupportHelpScreens = ({ route, navigation }) => {
  const { type } = route.params || { type: 'Help Center' };

  const renderHelpCenter = () => (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Getting Started</Text>
      <HelpItem title="How to request volunteers" icon="account-question-outline" />
      <HelpItem title="How to join events" icon="calendar-heart" />
      <HelpItem title="How to track reports" icon="chart-box-outline" />
      <HelpItem title="NGO verification process" icon="shield-check-outline" />
    </View>
  );

  const renderReportProblem = () => (
    <View style={styles.form}>
      <Text style={styles.inputLabel}>Issue Title</Text>
      <TextInput mode="outlined" placeholder="e.g., Cannot upload photos" style={styles.input} outlineColor="#E5E7EB" />
      
      <Text style={styles.inputLabel}>Description</Text>
      <TextInput mode="outlined" placeholder="Please describe the issue in detail" multiline numberOfLines={5} style={[styles.input, { height: 120 }]} outlineColor="#E5E7EB" />
      
      <TouchableOpacity style={styles.attachBtn}>
        <MaterialCommunityIcons name="camera-plus-outline" size={24} color="#D97706" />
        <Text style={styles.attachText}>Attach Screenshots</Text>
      </TouchableOpacity>

      <Button mode="contained" style={styles.submitBtn} contentStyle={{ height: 56 }}>Submit Report</Button>
    </View>
  );

  const HelpItem = ({ title, icon }) => (
    <TouchableOpacity style={styles.helpItem} activeOpacity={1}>
      <View style={styles.helpItemLeft}>
        <MaterialCommunityIcons name={icon} size={24} color="#D97706" />
        <Text style={styles.helpText}>{title}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
    </TouchableOpacity>
  );

  return (
    <ProfileSubScreenWrapper title={type} navigation={navigation}>
      {type === 'Help Center' ? renderHelpCenter() : renderReportProblem()}
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
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
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  helpItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  helpText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#344054',
  },
  form: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    marginBottom: 30,
  },
  attachText: {
    fontWeight: '900',
    color: '#D97706',
  },
  submitBtn: {
    borderRadius: 16,
    backgroundColor: '#D97706',
  }
});
