import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, StatusBar, Alert } from 'react-native';
import { useTheme, IconButton, Text, Avatar, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';
import { auth } from '../services/auth';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoIconBox}>
      <MaterialCommunityIcons name={icon} size={22} color="#1A1C1E" />
    </View>
    <View style={styles.infoTextColumn}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  const [user, setUser] = useState({
    fullName: "Akash",
    email: "akash@example.com",
    location: "Chennai, India",
    avatarUrl: null,
    isVolunteer: false
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await api.getUserProfile();
        if (profileData) {
          setUser({
            fullName: profileData.fullName || "User",
            email: profileData.email,
            location: profileData.location || "Unknown",
            avatarUrl: profileData.avatarUrl,
            isVolunteer: profileData.isVolunteer || false
          });
        }
      } catch (error) {
        console.warn("API Error (Profile):", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          style: "destructive",
          onPress: async () => {
            try {
              await auth.signOut();
              navigation.replace('Login');
            } catch (error) {
              console.error("Logout error:", error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#1A1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 44 }} /> 
        </View>

        {/* AVATAR SECTION */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Avatar.Image 
              size={120} 
              source={{ uri: user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} 
            />
            <TouchableOpacity style={styles.editAvatarBtn} onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name="pencil-outline" size={18} color="#1A1C1E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* PERSONAL INFO CARD */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Personal info</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <InfoItem icon="account-outline" label="Name" value={user.fullName} />
            <Divider style={styles.divider} />
            <InfoItem icon="email-outline" label="E-mail" value={user.email} />
            <Divider style={styles.divider} />
            <InfoItem icon="phone-outline" label="Phone number" value="+91 98765 43210" />
            <Divider style={styles.divider} />
            <InfoItem icon="map-marker-outline" label="Home address" value={user.location} />
          </View>
        </View>

        {/* ACCOUNT INFO CARD */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account info</Text>
          <View style={styles.infoCard}>
             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('JoinedEvents')}>
               <View style={styles.menuItemLeft}>
                  <View style={[styles.infoIconBox, { backgroundColor: '#F0F9FF' }]}>
                    <MaterialCommunityIcons name="calendar-check-outline" size={22} color="#0EA5E9" />
                  </View>
                  <Text style={styles.menuText}>Joined Events</Text>
               </View>
               <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
             </TouchableOpacity>
             <Divider style={styles.divider} />
             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyRequests')}>
               <View style={styles.menuItemLeft}>
                  <View style={[styles.infoIconBox, { backgroundColor: '#FFF7ED' }]}>
                    <MaterialCommunityIcons name="hand-heart-outline" size={22} color="#D97706" />
                  </View>
                  <Text style={styles.menuText}>My Requests</Text>
               </View>
               <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
             </TouchableOpacity>
             <Divider style={styles.divider} />
             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SecurityPrivacy')}>
               <View style={styles.menuItemLeft}>
                  <View style={[styles.infoIconBox, { backgroundColor: '#F0FDF4' }]}>
                    <MaterialCommunityIcons name="shield-check-outline" size={22} color="#10B981" />
                  </View>
                  <Text style={styles.menuText}>Security & Privacy</Text>
               </View>
               <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
             </TouchableOpacity>
          </View>
        </View>

        {/* LOGOUT BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
             <MaterialCommunityIcons name="logout" size={22} color="#EF4444" />
             <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Version 1.2.0 (Premium)</Text>
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 16,
  },
  editLink: {
    color: '#1A1C1E',
    fontWeight: '800',
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#F8F9FA',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  infoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextColumn: {
    marginLeft: 16,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  divider: {
    backgroundColor: '#F8F9FA',
    height: 1,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1C1E',
    marginLeft: 16,
  },
  footer: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 28,
    backgroundColor: '#FFF1F1',
    borderWidth: 1,
    borderColor: '#FFE4E4',
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  versionText: {
    marginTop: 20,
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  }
});
