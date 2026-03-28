import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../../services/api';

export const SecurityPrivacyScreens = ({ route, navigation }) => {
  const { type } = route.params || { type: 'Security' };
  const [securityData, setSecurityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSecurity = async () => {
      try {
        const data = await api.getSecurityStatus();
        setSecurityData(data);
      } catch (error) {
        console.error("Error fetching security status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (type === 'Security') fetchSecurity();
    else setIsLoading(false);
  }, [type]);

  const SecurityItem = ({ title, subtitle, icon, color }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
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
            <View style={styles.mainCard}>
              {type === 'Security' ? (
                <>
                  <Text style={styles.subHeader}>Security Methods</Text>
                  <SecurityItem 
                    title="Linked Account" 
                    subtitle={securityData ? securityData.email : "Linking profile..."} 
                    icon="google" 
                    color="#EA4335" 
                  />
                  <Divider style={styles.divider} />
                  <SecurityItem 
                    title="Active Sessions" 
                    subtitle={securityData ? `${securityData.sessions} Device found` : "1 Device"} 
                    icon="cellphone-link" 
                    color="#3B82F6" 
                  />
                  
                  <Text style={styles.subHeader}>Identity Status</Text>
                  <SecurityItem 
                    title="Verification" 
                    subtitle={securityData?.isVerified ? "Verified Identity" : "Pending Verification"} 
                    icon="shield-check" 
                    color={securityData?.isVerified ? "#10B981" : "#F59E0B"} 
                  />
                  
                  <View style={{ height: 10 }} />
                </>
              ) : (
                <>
                  <Text style={styles.subHeader}>Profile Visibility</Text>
                  <VisibilityItem title="Public" subtitle="Everyone can see your activity" icon="earth" selected />
                  <Divider style={styles.divider} />
                  <VisibilityItem title="Limited" subtitle="Only trusted partners" icon="lock-outline" />
                  <Divider style={styles.divider} />
                  <VisibilityItem title="Private" subtitle="Fully anonymous contribution" icon="incognito" />
                </>
              )}
            </View>

            {/* SECONDARY ACTION */}
            <TouchableOpacity style={styles.secondaryActionBtn} activeOpacity={0.8}>
                <MaterialCommunityIcons 
                   name={type === 'Security' ? "account-off-outline" : "history"} 
                   size={20} 
                   color={type === 'Security' ? "#E11D48" : "#64748B"} 
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
    paddingTop: 10,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    overflow: 'hidden',
    padding: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#F8F9FA',
  },
  subHeader: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 24,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  itemTitle: {
    fontWeight: '900',
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
    marginHorizontal: 20,
  },
  visibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  visibilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  vIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
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
    marginTop: 25,
    borderRadius: 22,
    height: 60,
  },
  secondaryActionText: {
    fontWeight: '900',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  }
});
