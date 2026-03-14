import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, IconButton, useTheme, Card } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const VolunteerApplicationScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ProfileSubScreenWrapper title="Volunteer Program" navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroBox}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="hand-heart" size={48} color="#D97706" />
          </View>
          <Text variant="headlineMedium" style={styles.heroTitle}>Join the Community</Text>
          <Text variant="bodyMedium" style={styles.heroSub}>Make a direct impact by becoming a verified volunteer in your neighborhood.</Text>
        </View>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>Why Volunteer?</Text>
            <View style={styles.benefitRow}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
              <Text style={styles.benefitText}>Help local NGOs with their missions</Text>
            </View>
            <View style={styles.benefitRow}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
              <Text style={styles.benefitText}>Earn verified impact badges</Text>
            </View>
            <View style={styles.benefitRow}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
              <Text style={styles.benefitText}>Connect with fellow changemakers</Text>
            </View>
          </Card.Content>
        </Card>

        <Button 
          mode="contained" 
          onPress={() => {}} 
          style={styles.applyBtn}
          contentStyle={{ height: 56 }}
        >
          Start Application
        </Button>
      </ScrollView>
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  heroBox: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  heroTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
    textAlign: 'center',
  },
  heroSub: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 10,
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: 15,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  benefitText: {
    color: '#4B5563',
    fontWeight: '600',
  },
  applyBtn: {
    marginTop: 10,
    borderRadius: 18,
    backgroundColor: '#D97706',
  }
});
