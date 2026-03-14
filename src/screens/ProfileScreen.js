import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme, IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Components
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileStats } from '../components/ProfileStats';
import { ReportsMenu } from '../components/ReportsMenu';
import { SavedItemsMenu } from '../components/SavedItemsMenu';
import { VolunteerProgramCard } from '../components/VolunteerProgramCard';
import { PreferencesMenu } from '../components/PreferencesMenu';
import { SecurityMenu } from '../components/SecurityMenu';
import { SupportMenu } from '../components/SupportMenu';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // Mock data for indicators
  const stats = {
    requestsCreated: 3,
    eventsJoined: 4,
    completedRequests: 2
  };

  const user = {
    name: "Akash",
    location: "Chennai, India",
    memberSince: "2026",
    email: "akash@example.com",
    isVerified: true,
    isVolunteer: false
  };

  const handleNavigate = (route) => {
    navigation.navigate(route);
  };

  const MeshBackground = () => (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF9F0' }]}>
      <View style={[styles.blob, { top: -100, left: -50, backgroundColor: 'rgba(217, 119, 6, 0.1)', width: 300, height: 300 }]} />
      <View style={[styles.blob, { bottom: 200, right: -100, backgroundColor: 'rgba(16, 185, 129, 0.08)', width: 400, height: 400 }]} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MeshBackground />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        <ProfileHeader
          name={user.name}
          email={user.email}
          location={user.location}
          memberSince={user.memberSince}
          isVerified={user.isVerified}
          onEdit={() => handleNavigate('EditProfile')}
        />

        <ProfileStats stats={stats} onNavigate={handleNavigate} />

        <ReportsMenu onNavigate={handleNavigate} />

        <SavedItemsMenu onNavigate={handleNavigate} />

        <VolunteerProgramCard
          isVolunteer={user.isVolunteer}
          onApply={() => handleNavigate('VolunteerApplication')}
        />

        <PreferencesMenu onNavigate={handleNavigate} />

        <SecurityMenu onNavigate={handleNavigate} />

        <SupportMenu onNavigate={handleNavigate} />

        <View style={styles.footerInfo}>
          <Text style={styles.versionText}>Version 1.2.0 (Premium)</Text>
        </View>
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
    borderRadius: 200,
  },
  footerInfo: {
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  versionText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  }
});
