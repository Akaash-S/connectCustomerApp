import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { ProfileHeader } from '../components/ProfileHeader';
import { ActivityMenu } from '../components/ActivityMenu';
import { ReportsMenu } from '../components/ReportsMenu';
import { SettingsMenu } from '../components/SettingsMenu';
import { SupportMenu } from '../components/SupportMenu';

export const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();

  // Mock data for indicators
  const stats = {
    activeRequests: 2,
    completedRequests: 3
  };

  const handleNavigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Notification Icon */}
      <View style={styles.topActions}>
        <IconButton 
          icon="bell-outline" 
          size={24} 
          onPress={() => navigation.navigate('Notifications')} 
          style={styles.notifBtn}
        />
      </View>

      <ProfileHeader 
        name="Akash" 
        location="Chennai, India" 
        memberSince="2026" 
        isVerified={true}
        onEdit={() => handleNavigate('EditProfile')}
      />

      <ActivityMenu onNavigate={handleNavigate} stats={stats} />
      
      <ReportsMenu onNavigate={handleNavigate} />
      
      <SettingsMenu onNavigate={handleNavigate} />
      
      <SupportMenu />
      
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  topActions: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  notifBtn: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    elevation: 4,
  }
});
