import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Button, Divider } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const LegalScreens = ({ route, navigation }) => {
  const { type } = route.params || { type: 'About CONNECT' };

  const renderAbout = () => (
    <View style={styles.aboutContainer}>
      <View style={styles.logoSection}>
        <Avatar.Icon size={100} icon="palette" style={{ backgroundColor: '#D97706' }} />
        <Text style={styles.appName}>CONNECT</Text>
        <Text style={styles.appVersion}>Version 1.2.0 (Premium Build)</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Our Mission</Text>
        <Text style={styles.cardText}>
          CONNECT is dedicated to bridging the gap between passionate volunteers and impactful social initiatives. 
          We believe in the power of community action to drive sustainable change.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Core Values</Text>
        <View style={styles.valueRow}>
          <MaterialCommunityIcons name="heart-flash" size={24} color="#D97706" />
          <Text style={styles.valueText}>Empathy First</Text>
        </View>
        <View style={styles.valueRow}>
          <MaterialCommunityIcons name="shield-check" size={24} color="#D97706" />
          <Text style={styles.valueText}>Trust & Safety</Text>
        </View>
        <View style={styles.valueRow}>
          <MaterialCommunityIcons name="account-group" size={24} color="#D97706" />
          <Text style={styles.valueText}>Community Growth</Text>
        </View>
      </View>

      <Text style={styles.copy}>© 2026 CONNECT App Team. All rights reserved.</Text>
    </View>
  );

  const renderLegalText = (title) => (
    <View style={styles.legalContainer}>
      <Text style={styles.legalTitle}>{title}</Text>
      <Text style={styles.legalLastUpdated}>Last Updated: March 10, 2026</Text>
      <Divider style={styles.legalDivider} />
      <Text style={styles.legalContent}>
        1. Acceptance of Terms{"\n"}
        By accessing and using the CONNECT application, you agree to be bound by these terms and conditions. 
        Please read them carefully before proceeding.{"\n\n"}
        2. User Conduct{"\n"}
        Users are expected to maintain professional and respectful behavior within the community. 
        Any form of harassment or misuse of the platform will result in immediate account suspension.{"\n\n"}
        3. Data Privacy{"\n"}
        We value your privacy. Your personal information is protected under our strict encryption protocols 
        and will never be shared with third parties without your explicit consent.{"\n\n"}
        4. Liability{"\n"}
        CONNECT serves as a matching platform. While we verify NGOs, participants join events at their own discretion.
      </Text>
    </View>
  );

  return (
    <ProfileSubScreenWrapper title={type} navigation={navigation}>
      {type === 'About CONNECT' ? renderAbout() : renderLegalText(type)}
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    alignItems: 'center',
    gap: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#D97706',
    marginTop: 15,
    letterSpacing: 2,
  },
  appVersion: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '700',
    marginTop: 5,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    fontWeight: '500',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 15,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#344054',
  },
  copy: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '700',
    marginTop: 20,
  },
  legalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  legalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#D97706',
  },
  legalLastUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 5,
    fontWeight: '700',
  },
  legalDivider: {
    marginVertical: 20,
  },
  legalContent: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 24,
    fontWeight: '500',
  }
});
