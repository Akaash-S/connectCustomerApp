import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, Alert, Dimensions, Platform } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const SecurityPrivacyScreens = ({ route, navigation }) => {
  const { type } = route.params || { type: 'Security' };
  const [securityData, setSecurityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Get current device info (Static for demo/consistent detection)
  const THIS_DEVICE = {
    id: 'current',
    device: Platform.OS === 'ios' ? 'iPhone 15 Pro' : 'Android Emulator',
    location: 'Chennai, India',
    isCurrent: true,
    lastActive: new Date().toISOString()
  };

  const fetchSecurity = async () => {
    setIsLoading(true);
    try {
      const data = await api.getSecurityStatus();
      setSecurityData(data);
    } catch (error) {
      console.error("Error fetching security status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (type === 'Security') fetchSecurity();
    else setIsLoading(false);
  }, [type]);

  const handleSecurityAction = (itemTitle) => {
    switch (itemTitle) {
      case 'Linked Account':
        Alert.alert("Account Security", `Your profile is securely linked to ${securityData?.email || 'your Google account'}.`);
        break;
      case 'Identity Verification':
        Alert.alert("Identity Status", securityData?.isVerified ? "Your identity is fully verified. You have maximum community trust." : "Identity verification is in progress. Please check back soon.");
        break;
      default:
        break;
    }
  };

  const handleRevokeSession = async (sessionId, deviceName) => {
    Alert.alert(
      "Revoke Session",
      `Are you sure you want to logout from ${deviceName}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout Device", 
          style: "destructive",
          onPress: async () => {
             setIsActionLoading(true);
             try {
                await api.revokeSession(sessionId);
                Alert.alert("Success", "Device has been remotely logged out.");
                await fetchSecurity(); // Refresh list
             } catch (error) {
                Alert.alert("Error", "Failed to revoke session. Please try again.");
             } finally {
                setIsActionLoading(false);
             }
          }
        }
      ]
    );
  };

  const handleEmergencyLock = () => {
    Alert.alert(
      "EMERGENCY LOCK",
      "This will immediately terminate ALL remote sessions and secure your account. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "LOCK ACCOUNT", 
          style: "destructive",
          onPress: async () => {
             setIsActionLoading(true);
             try {
                if (Array.isArray(securityData?.sessions)) {
                   const remoteSessions = securityData.sessions.filter(s => s && !s.isCurrent);
                   await Promise.allSettled(remoteSessions.map(s => api.revokeSession(s.id)));
                }
                Alert.alert("Account Locked", "All remote sessions terminated. Account secured.");
                await fetchSecurity();
             } catch (error) {
                Alert.alert("Error", "Safety protocols failed. Please contact support.");
             } finally {
                setIsActionLoading(false);
             }
          }
        }
      ]
    );
  };

  const SecurityItem = ({ title, subtitle, icon, color, onPress }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconBox, { backgroundColor: color + '12' }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
    </TouchableOpacity>
  );

  const SessionItem = ({ session }) => (
    <View style={styles.sessionItem}>
       <View style={styles.sessionLeft}>
          <View style={[styles.sessionIconBox, session.isCurrent && styles.currentSessionIcon]}>
             <MaterialCommunityIcons 
                name={session.device.includes('iPhone') || session.device.includes('Android') ? "cellphone" : "laptop"} 
                size={22} 
                color={session.isCurrent ? "#FFFFFF" : "#64748B"} 
             />
          </View>
          <View>
             <View style={styles.sessionTitleRow}>
                <Text style={styles.sessionDevice}>{session.device}</Text>
                {session.isCurrent && (
                  <View style={styles.currentBadge}>
                     <Text style={styles.currentBadgeText}>THIS DEVICE</Text>
                  </View>
                )}
             </View>
             <Text style={styles.sessionMeta}>{session.location} • {session.isCurrent ? "Active now" : (session.lastActive ? new Date(session.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently Active')}</Text>
          </View>
       </View>
       {!session.isCurrent && (
         <TouchableOpacity 
            style={styles.terminateBtn} 
            onPress={() => handleRevokeSession(session.id, session.device)}
            disabled={isActionLoading}
          >
            <Text style={styles.terminateText}>LOGOUT</Text>
         </TouchableOpacity>
       )}
    </View>
  );

  const VisibilityItem = ({ title, subtitle, icon, selected }) => (
    <TouchableOpacity style={styles.visibilityItem} activeOpacity={0.7}>
      <View style={styles.visibilityLeft}>
        <View style={[styles.vIconBox, selected && { backgroundColor: '#1A1C1E' }]}>
           <MaterialCommunityIcons name={icon} size={20} color={selected ? "#FFFFFF" : "#94A3B8"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.itemTitle, selected && { color: '#1A1C1E' }]}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {selected ? (
        <MaterialCommunityIcons name="radiobox-marked" size={24} color="#1A1C1E" />
      ) : (
        <MaterialCommunityIcons name="radiobox-blank" size={24} color="#CBD5E1" />
      )}
    </TouchableOpacity>
  );

  // Construct combined sessions list
  const otherSessions = Array.isArray(securityData?.sessions) ? securityData.sessions.filter(s => s && !s.isCurrent) : [];
  const allSessions = [THIS_DEVICE, ...otherSessions];

  return (
    <ProfileSubScreenWrapper 
      title={type} 
      subtitle={type === 'Security' ? "Manage account safety" : "Manage your visibility"} 
      navigation={navigation}
    >
       <StatusBar barStyle="dark-content" />
       
       {isLoading ? (
          <View style={styles.loader}>
             <ActivityIndicator color="#1A1C1E" />
          </View>
       ) : (
          <View style={styles.hubContainer}>
            {type === 'Security' ? (
              <>
                {/* CONTAINER 1: AUTHENTICATION */}
                <View style={styles.mainCard}>
                  <Text style={styles.subHeader}>Security Methods</Text>
                  <SecurityItem 
                    title="Linked Account" 
                    subtitle={securityData ? securityData.email : "Linking profile..."} 
                    icon="google" 
                    color="#EA4335" 
                    onPress={() => handleSecurityAction('Linked Account')}
                  />
                  <Divider style={styles.divider} />
                  <SecurityItem 
                    title="Identity Verification" 
                    subtitle={securityData?.isVerified ? "Verified Identity" : "Pending Verification"} 
                    icon="shield-check" 
                    color={securityData?.isVerified ? "#10B981" : "#F59E0B"} 
                    onPress={() => handleSecurityAction('Identity Verification')}
                  />
                </View>

                {/* CONTAINER 2: ACTIVE SESSIONS */}
                <View style={[styles.mainCard, { marginTop: 40 }]}>
                   <Text style={styles.subHeader}>Active Sessions</Text>
                   <View style={styles.sessionList}>
                      {allSessions.map((session, index) => (
                        <React.Fragment key={session.id}>
                           <SessionItem session={session} />
                           {index < allSessions.length - 1 && <Divider style={styles.sessionDivider} />}
                        </React.Fragment>
                      ))}
                   </View>
                </View>

                {/* CONTAINER 3: EMERGENCY */}
                <TouchableOpacity 
                   style={styles.emergencyCard} 
                   activeOpacity={0.8}
                   onPress={handleEmergencyLock}
                >
                   <View style={styles.emergencyIcon}>
                      <MaterialCommunityIcons name="shield-alert-outline" size={24} color="#EF4444" />
                   </View>
                   <View style={{ flex: 1 }}>
                      <Text style={styles.emergencyTitle}>Emergency Lock</Text>
                      <Text style={styles.emergencySub}>Logout from all devices & secure account</Text>
                   </View>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.mainCard}>
                <Text style={styles.subHeader}>Profile Visibility</Text>
                <VisibilityItem title="Public" subtitle="Everyone can see your activity" icon="earth" selected />
                <Divider style={styles.divider} />
                <VisibilityItem title="Limited" subtitle="Only trusted partners" icon="lock-outline" />
                <Divider style={styles.divider} />
                <VisibilityItem title="Private" subtitle="Fully anonymous contribution" icon="incognito" />
              </View>
            )}

            {/* SECONDARY ACTION */}
            <TouchableOpacity style={styles.secondaryActionBtn} activeOpacity={0.8}>
                <MaterialCommunityIcons 
                   name={type === 'Security' ? "account-off-outline" : "history"} 
                   size={20} 
                   color={type === 'Security' ? "#E11D48" : "#1A1C1E"} 
                />
                <Text style={[styles.secondaryActionText, type === 'Security' && { color: '#E11D48' }]}>
                   {type === 'Security' ? "Deactivate Account" : "Clear Activity Logs"}
                </Text>
            </TouchableOpacity>
          </View>
       )}
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  loader: {
    padding: 100,
    alignItems: 'center',
  },
  hubContainer: {
    paddingTop: 0,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#F8F9FA',
  },
  subHeader: {
    paddingTop: 24,
    paddingBottom: 16,
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  itemTitle: {
    fontWeight: '910',
    fontSize: 16,
    color: '#1A1C1E',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F8F9FA',
  },
  sessionList: {
    marginTop: 8,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  sessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  sessionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  currentSessionIcon: {
    backgroundColor: '#1A1C1E',
    borderColor: '#1A1C1E',
  },
  sessionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sessionDevice: {
    fontSize: 15,
    fontWeight: '910',
    color: '#1A1C1E',
  },
  currentBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  currentBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  sessionMeta: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 2,
  },
  sessionDivider: {
    height: 1,
    backgroundColor: '#F8F9FA',
    marginLeft: 0,
  },
  terminateBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  terminateText: {
    fontSize: 10,
    fontWeight: '910',
    color: '#EF4444',
  },
  emergencyCard: {
    marginTop: 40,
    backgroundColor: '#FFF1F2',
    borderRadius: 35,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },
  emergencyIcon: {
    width: 52,
    height: 52,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '910',
    color: '#E11D48',
  },
  emergencySub: {
    fontSize: 12,
    color: '#FB7185',
    fontWeight: '700',
    marginTop: 4,
  },
  visibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  visibilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  vIconBox: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  secondaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
    backgroundColor: '#F8F9FA',
    marginTop: 40,
    borderRadius: 30,
    height: 60,
    marginBottom: 40,
  },
  secondaryActionText: {
    fontWeight: '910',
    color: '#1A1C1E',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  }
});
