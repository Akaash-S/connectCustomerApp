import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Text, Card, Avatar, useTheme, ProgressBar, Button, IconButton, Divider, Chip } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ACTIVITY_STATS = [
  { id: '1', label: 'Requests', count: '3', subLabel: 'Submitted', icon: 'email-outline', color: '#6366F1' },
  { id: '2', label: 'Completed', count: '2', subLabel: 'Completed', icon: 'check-circle-outline', color: '#10B981' },
  { id: '3', label: 'Community', count: 'Chennai', subLabel: 'Location', icon: 'map-marker-radius', color: '#F59E0B' },
];

const MY_REQUESTS = [
  { 
    id: '1', 
    title: 'Tree Plantation Volunteers Needed', 
    location: 'Chennai', 
    date: '20 March', 
    status: 'Pending', 
    progress: 0.1, 
    statusColor: '#F59E0B' 
  },
  { 
    id: '2', 
    title: 'Grocery Help for Senior Citizen', 
    location: 'Velachery', 
    date: '15 March', 
    status: 'In Progress', 
    progress: 0.6, 
    statusColor: '#3B82F6' 
  },
];

const VOLUNTEER_REPORTS = [
  { id: '1', title: 'Food Distribution', volunteer: 'Rahul S.', date: 'Important', icon: 'file-check-outline' },
  { id: '2', title: 'Cleanliness Drive', volunteer: 'Priya M.', date: 'Yesterday', icon: 'file-check-outline' },
];

const MY_EVENTS = [
  { id: '1', title: 'Beach Cleanup', location: 'Marina', date: '25 March', status: 'Registered' },
  { id: '2', title: 'Education Camp', location: 'Adyar', date: '30 March', status: 'Confirmed' },
];

const ACTIVITY_HISTORY = [
  { id: '1', date: '25 March', action: 'Volunteer matching with your request', icon: 'account-search' },
  { id: '2', date: '22 March', action: 'Submitted Help Request', icon: 'file-document-edit' },
  { id: '3', date: '18 March', action: 'Request #142 Completed', icon: 'check-decagram' },
];

export const RequestsScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.headerTitle}>My Activity</Text>
        <Text variant="bodyMedium" style={styles.headerSub}>Track your impact & requests</Text>
      </View>

      {/* 1. Activity Summary Dashboard */}
      <View style={styles.statsSection}>
        <Text variant="titleMedium" style={styles.sectionLabel}>Dashboard Overview</Text>
        <View style={styles.statsRow}>
          {ACTIVITY_STATS.map(stat => (
            <Card key={stat.id} style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
                  <MaterialCommunityIcons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text variant="headlineSmall" style={[styles.statCount, { color: stat.color }]}>{stat.count}</Text>
                <Text variant="labelSmall" style={styles.statLabel}>{stat.label}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      {/* 2. My Requests Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>My Requests</Text>
          <Button mode="text" compact>View All</Button>
        </View>
        {MY_REQUESTS.map(req => (
          <TouchableOpacity 
            key={req.id} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('RequestDetails', { requestId: req.id })}
          >
            <Card style={styles.requestCard}>
              <View style={styles.requestContent}>
                <View style={styles.requestMain}>
                  <Text variant="titleMedium" style={styles.requestTitle}>{req.title}</Text>
                  <View style={styles.requestMeta}>
                    <Text variant="labelSmall" style={styles.metaText}>📍 {req.location}  •  📅 {req.date}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: req.statusColor }]} />
                    <Text variant="labelSmall" style={[styles.statusText, { color: req.statusColor }]}>{req.status}</Text>
                  </View>
                  <ProgressBar progress={req.progress} color={req.statusColor} style={styles.requestProgress} />
                </View>
                <IconButton icon="chevron-right" size={24} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. Volunteer Reports Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Volunteer Reports</Text>
        </View>
        {VOLUNTEER_REPORTS.map(report => (
          <Card key={report.id} style={styles.reportCard}>
            <View style={styles.reportItemContainer}>
              <View style={styles.reportLeft}>
                <Avatar.Icon icon={report.icon} size={40} style={{ backgroundColor: '#EEF2FF' }} color="#4F46E5" />
                <View style={styles.reportTextInfo}>
                  <Text variant="titleMedium" style={styles.reportItemTitle}>{report.title}</Text>
                  <Text variant="bodySmall" style={styles.reportItemSub}>{`Completed by ${report.volunteer} • ${report.date}`}</Text>
                </View>
              </View>
              <Button 
                mode="outlined" 
                compact 
                style={styles.viewReportBtn}
                onPress={() => navigation.navigate('ReportDetails', { reportId: report.id })}
              >
                View
              </Button>
            </View>
          </Card>
        ))}
      </View>

      {/* 4. Activity History / Timeline */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={[styles.sectionTitle, { marginLeft: 20, marginBottom: 20 }]}>Recent Activity</Text>
        <View style={styles.timelineContainer}>
          {ACTIVITY_HISTORY.map((item, index) => (
            <View key={item.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineIcon, { backgroundColor: theme.colors.surfaceVariant }]}>
                  <MaterialCommunityIcons name={item.icon} size={18} color={theme.colors.primary} />
                </View>
                {index !== ACTIVITY_HISTORY.length - 1 && <View style={styles.timelineConnector} />}
              </View>
              <View style={styles.timelineRight}>
                <Text variant="labelSmall" style={styles.timelineDate}>{item.date}</Text>
                <Text variant="bodyMedium" style={styles.timelineAction}>{item.action}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  headerSub: {
    color: '#6B7280',
    marginTop: -2,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionLabel: {
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statContent: {
    padding: 12,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontWeight: '900',
  },
  statLabel: {
    color: '#9CA3AF',
    marginTop: 2,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  requestCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 24,
    backgroundColor: '#FFF',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  requestContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  requestMain: {
    flex: 1,
  },
  requestTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  requestMeta: {
    marginTop: 4,
  },
  metaText: {
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  requestProgress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3F4F6',
    marginTop: 4,
  },
  reportCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 2,
    overflow: 'hidden',
  },
  reportItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  reportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportTextInfo: {
    marginLeft: 12,
    flex: 1,
  },
  reportItemTitle: {
    fontWeight: 'bold',
  },
  reportItemSub: {
    color: '#6B7280',
  },
  viewReportBtn: {
    borderRadius: 8,
  },
  eventMiniCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  eventMiniContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  eventMiniTitle: {
    fontWeight: 'bold',
  },
  eventMiniMeta: {
    color: '#9CA3AF',
    marginTop: 2,
  },
  timelineContainer: {
    paddingHorizontal: 25,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: -5,
  },
  timelineRight: {
    flex: 1,
    paddingTop: 4,
  },
  timelineDate: {
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  timelineAction: {
    color: '#1A1C1E',
    marginTop: 2,
    fontWeight: '500',
  },
});
