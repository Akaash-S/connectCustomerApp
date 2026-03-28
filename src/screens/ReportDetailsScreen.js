import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { Text, Avatar, Divider, IconButton, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PRIMARY_DARK = '#1A1C1E';
const ACCENT_BLUE = '#3B82F6';
const ACCENT_EMERALD = '#10B981';
const GHOST_WHITE = '#F8F9FA';

export const ReportDetailsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reportId } = route.params || { reportId: '1' };

  // Mock report data with deep diagnostics
  const report = {
    title: 'Food Distribution Drive',
    volunteer: 'Rahul Sharma',
    date: '24 March 2026',
    status: 'Verified',
    notes: 'Successfully distributed meal packets to 50+ families in the area. The community was very welcoming and the team coordination was excellent.',
    images: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400'
    ],
    logistics: {
       timeSpent: '3.5 Hours',
       perimeter: 'Zone 4, Chennai Central',
       resources: '50 Meal Packets',
    },
    impact: {
       unitsReached: '52 Families',
       impactScore: '+150 Points',
    },
    verification: {
       verifiedBy: 'LifeLine Foundation',
       deviceHash: 'UID-8821-XPR0',
    }
  };

  const handleFinalize = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      Alert.alert("Success", "Performance Report has been validated and archived.");
      navigation.goBack();
      setIsSubmitting(false);
    }, 1500);
  };

  const EmptyDisplay = ({ label }) => (
    <View style={styles.emptyCard}>
       <MaterialCommunityIcons name="database-off-outline" size={24} color="#CBD5E1" />
       <Text style={styles.emptyText}>No data available for {label}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* MONOLITHIC HUB HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={32} color={PRIMARY_DARK} />
         </TouchableOpacity>
         <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>Performance Hub</Text>
            <Text style={styles.headerSub}>Execution Integrity Record</Text>
         </View>
         <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
      >
         {/* VOLUNTEER IDENTITY CARD */}
         <View style={styles.heroCard}>
            <View style={styles.identityRow}>
               <View style={styles.avatarBox}>
                  <Text style={styles.avatarText}>{report.volunteer.substring(0, 1)}</Text>
               </View>
               <View style={styles.idInfo}>
                  <Text style={styles.volunteerName}>{report.volunteer}</Text>
                  <Text style={styles.dateText}>{report.date} • {report.status}</Text>
               </View>
               <View style={styles.verifyBadge}>
                  <MaterialCommunityIcons name="check-decagram" size={24} color={ACCENT_BLUE} />
               </View>
            </View>
            
            <Divider style={styles.cardDivider} />
            
            <Text style={styles.reportTitle}>{report.title}</Text>
            {report.notes ? (
               <Text style={styles.notesText}>{report.notes}</Text>
            ) : (
               <EmptyDisplay label="Context Specifics" />
            )}
         </View>

         {/* LOGISTICS INTEGRITY HUB */}
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>The Logistics</Text>
            <Text style={styles.sectionTitle}>Operational Diagnostics</Text>
         </View>

         {report.logistics ? (
           <View style={styles.infoHubGrid}>
              <View style={styles.infoItem}>
                 <Text style={styles.infoLabel}>TIME SPENT</Text>
                 <Text style={styles.infoValue}>{report.logistics.timeSpent}</Text>
              </View>
              <View style={styles.infoItem}>
                 <Text style={styles.infoLabel}>PERIMETER</Text>
                 <Text style={styles.infoValue}>{report.logistics.perimeter}</Text>
              </View>
              <View style={styles.infoItem}>
                 <Text style={styles.infoLabel}>RESOURCES</Text>
                 <Text style={styles.infoValue}>{report.logistics.resources}</Text>
              </View>
           </View>
         ) : (
           <EmptyDisplay label="Operational Diagnostics" />
         )}

         {/* IMPACT METRICS HUB */}
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>The Scale</Text>
            <Text style={styles.sectionTitle}>Impact Measurement</Text>
         </View>

         {report.impact ? (
           <View style={styles.metricHubRow}>
              <View style={styles.metricCard}>
                 <MaterialCommunityIcons name="account-group-outline" size={24} color={PRIMARY_DARK} />
                 <Text style={styles.metricValue}>{report.impact.unitsReached}</Text>
                 <Text style={styles.metricLabel}>Community Reach</Text>
              </View>
              <View style={styles.metricCard}>
                 <MaterialCommunityIcons name="star-face" size={24} color={ACCENT_EMERALD} />
                 <Text style={[styles.metricValue, { color: ACCENT_EMERALD }]}>{report.impact.impactScore}</Text>
                 <Text style={styles.metricLabel}>Impact Score</Text>
              </View>
           </View>
         ) : (
           <EmptyDisplay label="Impact Metrics" />
         )}

         {/* EXECUTION EVIDENCE CENTER */}
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>The Evidence</Text>
            <Text style={styles.sectionTitle}>Execution Records</Text>
         </View>

         {report.images && report.images.length > 0 ? (
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
              {report.images.map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                   <Image source={{ uri: img }} style={styles.reportImage} />
                </View>
              ))}
           </ScrollView>
         ) : (
           <EmptyDisplay label="Visual Records" />
         )}

         {/* VERIFICATION CHAIN HUB */}
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>The Integrity</Text>
            <Text style={styles.sectionTitle}>Verification Metadata</Text>
         </View>

         {report.verification ? (
            <View style={styles.verificationCard}>
               <View style={styles.vRow}>
                  <MaterialCommunityIcons name="shield-check" size={20} color={ACCENT_BLUE} />
                  <Text style={styles.vValue}>Signature: {report.verification.verifiedBy}</Text>
               </View>
               <View style={styles.vRow}>
                  <MaterialCommunityIcons name="console-network" size={20} color="#94A3B8" />
                  <Text style={styles.vSub}>Device ID Ref: {report.verification.deviceHash}</Text>
               </View>
            </View>
         ) : (
           <EmptyDisplay label="Verification Metadata" />
         )}

         {/* SUBMISSION HUB (SAME LAYER) */}
         <View style={styles.submissionHub}>
            <Text style={styles.hubLabel}>Finalization Protocol</Text>
            <Text style={styles.hubSub}>Confirm the integrity of this implementation record before archiving.</Text>
            
            <TouchableOpacity 
               style={[styles.submitBtn, isSubmitting && { opacity: 0.8 }]} 
               onPress={handleFinalize}
               activeOpacity={0.9}
               disabled={isSubmitting}
            >
               {isSubmitting ? (
                 <ActivityIndicator color="#FFFFFF" />
               ) : (
                 <>
                    <Text style={styles.submitText}>Validate & Archive Hub</Text>
                    <View style={styles.btnIconBox}>
                       <MaterialCommunityIcons name="shield-check-outline" size={20} color={PRIMARY_DARK} />
                    </View>
                 </>
               )}
            </TouchableOpacity>
         </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: GHOST_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerTitleGroup: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '910',
    color: PRIMARY_DARK,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35, // Premium Hub Radius
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    marginBottom: 40,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '910',
  },
  idInfo: {
    flex: 1,
    marginLeft: 16,
  },
  volunteerName: {
    fontSize: 18,
    fontWeight: '910',
    color: PRIMARY_DARK,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    marginTop: 2,
  },
  verifyBadge: {
    marginLeft: 10,
  },
  cardDivider: {
    marginVertical: 20,
    backgroundColor: '#F8F9FA',
  },
  reportTitle: {
    fontSize: 22,
    fontWeight: '910',
    color: PRIMARY_DARK,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  notesText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '910',
    color: PRIMARY_DARK,
    letterSpacing: -1,
  },
  infoHubGrid: {
    backgroundColor: GHOST_WHITE,
    borderRadius: 32,
    padding: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 40,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '800',
    color: PRIMARY_DARK,
  },
  metricHubRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 40,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '1000',
    color: PRIMARY_DARK,
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  gallery: {
    marginBottom: 40,
  },
  imageWrapper: {
    marginRight: 15,
  },
  reportImage: {
    width: 240,
    height: 160,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  verificationCard: {
    backgroundColor: GHOST_WHITE,
    borderRadius: 22,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 40,
  },
  vRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vValue: {
    fontSize: 14,
    fontWeight: '910',
    color: PRIMARY_DARK,
  },
  vSub: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  submissionHub: {
    backgroundColor: GHOST_WHITE,
    borderRadius: 35,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  hubLabel: {
    fontSize: 16,
    fontWeight: '910',
    color: PRIMARY_DARK,
    marginBottom: 8,
  },
  hubSub: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  submitBtn: {
    backgroundColor: PRIMARY_DARK,
    height: 70,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 8,
    shadowColor: PRIMARY_DARK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '910',
    letterSpacing: 0.5,
  },
  btnIconBox: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCard: {
     backgroundColor: GHOST_WHITE,
     borderRadius: 22,
     padding: 20,
     alignItems: 'center',
     justifyContent: 'center',
     borderWidth: 1,
     borderColor: '#F1F5F9',
     borderStyle: 'dashed',
     marginBottom: 40,
  },
  emptyText: {
     fontSize: 12,
     fontWeight: '800',
     color: '#94A3B8',
     marginTop: 8,
     fontStyle: 'italic',
  }
});
