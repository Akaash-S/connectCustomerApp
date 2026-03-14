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

const MeshBackground = () => (
  <View style={[StyleSheet.absoluteFill, { backgroundColor: '#F5F7FF' }]}>
    <View style={[styles.blob, { top: -100, right: -50, backgroundColor: 'rgba(99, 102, 241, 0.08)', width: 400, height: 400 }]} />
    <View style={[styles.blob, { bottom: 100, left: -100, backgroundColor: 'rgba(16, 185, 129, 0.05)', width: 350, height: 350 }]} />
  </View>
);

export const RequestsScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <MeshBackground />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.headerTitle}>My Activity</Text>
          <Text variant="bodyLarge" style={styles.headerSub}>Tracking your community impact</Text>
        </View>

        {/* 1. Activity Summary Dashboard */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            {ACTIVITY_STATS.map(stat => (
              <Card key={stat.id} style={styles.statGlassCard}>
                <View style={styles.statContent}>
                  <View style={[styles.statIconBox, { backgroundColor: stat.color + '15' }]}>
                    <MaterialCommunityIcons name={stat.icon} size={22} color={stat.color} />
                  </View>
                  <Text variant="headlineSmall" style={[styles.statCount, { color: '#1A1C1E' }]}>{stat.count}</Text>
                  <Text variant="labelSmall" style={styles.statLabel}>{stat.label}</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* 2. My Requests Section */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Active Requests</Text>
          <Button mode="text" labelStyle={{ color: '#6366F1' }}>View All</Button>
        </View>
        
        {MY_REQUESTS.map(req => (
          <TouchableOpacity 
            key={req.id} 
            activeOpacity={1}
            onPress={() => navigation.navigate('RequestDetails', { requestId: req.id })}
            style={styles.requestItem}
          >
            <View style={styles.progressGlassCard}>
              <View style={styles.reqTop}>
                <View style={styles.reqMainInfo}>
                  <Text variant="titleMedium" style={styles.reqTitle}>{req.title}</Text>
                  <View style={styles.reqMetaRow}>
                    <MaterialCommunityIcons name="map-marker" size={14} color="#6B7280" />
                    <Text variant="bodySmall" style={styles.reqMetaText}>{req.location} • {req.date}</Text>
                  </View>
                </View>
                <View style={[styles.statusGlassBadge, { backgroundColor: req.statusColor + '15' }]}>
                  <Text style={[styles.statusBadgeText, { color: req.statusColor }]}>{req.status.toUpperCase()}</Text>
                </View>
              </View>
              
              <View style={styles.progressSection}>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabelText}>Response Rate</Text>
                  <Text style={styles.progressValueText}>{Math.round(req.progress * 100)}%</Text>
                </View>
                <ProgressBar progress={req.progress} color={req.statusColor} style={styles.premiumProgress} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* 3. Volunteer Reports Section */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Recent Reports</Text>
        </View>
        
        {VOLUNTEER_REPORTS.map(report => (
          <TouchableOpacity 
            key={report.id} 
            activeOpacity={1}
            onPress={() => navigation.navigate('ReportDetails', { reportId: report.id })}
            style={styles.reportItem}
          >
            <View style={styles.reportGlassCard}>
              <View style={styles.reportContent}>
                <View style={styles.reportIconCircle}>
                  <MaterialCommunityIcons name={report.icon} size={24} color="#4F46E5" />
                </View>
                <View style={styles.reportText}>
                  <Text variant="titleMedium" style={styles.reportTitleText}>{report.title}</Text>
                  <Text variant="bodySmall" style={styles.reportSubText}>{`By ${report.volunteer} • ${report.date}`}</Text>
                </View>
                <IconButton 
                  icon="arrow-right-circle-outline" 
                  size={24} 
                  iconColor="#6366F1"
                  style={{ margin: 0 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* 4. Activity History / Timeline */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Activity Timeline</Text>
        </View>
        
        <View style={styles.glassTimeline}>
          {ACTIVITY_HISTORY.map((item, index) => (
            <View key={item.id} style={styles.timelineNode}>
              <View style={styles.nodeLeft}>
                <View style={styles.nodeCircle}>
                  <MaterialCommunityIcons name={item.icon} size={16} color="#4F46E5" />
                </View>
                {index !== ACTIVITY_HISTORY.length - 1 && <View style={styles.nodeLine} />}
              </View>
              <View style={styles.nodeRight}>
                <Text style={styles.nodeDate}>{item.date}</Text>
                <Text style={styles.nodeLabel}>{item.action}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blob: {
    position: 'absolute',
    borderRadius: 300,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  headerSub: {
    color: '#6B7280',
    marginTop: 4,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statGlassCard: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statContent: {
    padding: 16,
    alignItems: 'center',
  },
  statIconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  statCount: {
    fontWeight: '900',
    fontSize: 18,
  },
  statLabel: {
    color: '#9CA3AF',
    marginTop: 4,
    fontSize: 9,
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  requestItem: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  progressGlassCard: {
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  reqTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  reqMainInfo: {
    flex: 1,
    marginRight: 10,
  },
  reqTitle: {
    fontWeight: '800',
    color: '#1A1C1E',
  },
  reqMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  reqMetaText: {
    color: '#6B7280',
    fontSize: 12,
  },
  statusGlassBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '900',
  },
  progressSection: {
    marginTop: 10,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabelText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
  },
  progressValueText: {
    color: '#1A1C1E',
    fontSize: 12,
    fontWeight: '800',
  },
  premiumProgress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  reportGlassCard: {
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  reportItem: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  reportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  reportIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportText: {
    flex: 1,
    marginLeft: 16,
  },
  reportTitleText: {
    fontWeight: '800',
    color: '#1A1C1E',
  },
  reportSubText: {
    color: '#6B7280',
    marginTop: 2,
  },
  glassTimeline: {
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    padding: 28,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  timelineNode: {
    flexDirection: 'row',
    minHeight: 80,
  },
  nodeLeft: {
    alignItems: 'center',
    width: 24,
    marginRight: 16,
  },
  nodeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  nodeLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  nodeRight: {
    flex: 1,
    paddingBottom: 24,
  },
  nodeDate: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '700',
    marginBottom: 4,
  },
  nodeLabel: {
    fontSize: 14,
    color: '#1A1C1E',
    fontWeight: '800',
  }
});
