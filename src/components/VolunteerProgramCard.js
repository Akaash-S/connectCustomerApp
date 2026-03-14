import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const VolunteerProgramCard = ({ onApply, isVolunteer }) => {
  if (isVolunteer) return null;

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionHeader}>Volunteer Program</Text>
      <TouchableOpacity activeOpacity={0.9} onPress={onApply}>
        <BlurView intensity={20} tint="light" style={styles.promoCard}>
          <View style={styles.content}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="account-star-outline" size={32} color="#FFF" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.promoTitle}>Become a Volunteer</Text>
              <Text style={styles.promoSubtitle}>Make a direct impact in your community today.</Text>
            </View>
          </View>
          <Button 
            mode="contained" 
            style={styles.applyBtn} 
            labelStyle={styles.applyBtnLabel}
            onPress={onApply}
          >
            Apply Now
          </Button>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 12,
    marginLeft: 4,
  },
  promoCard: {
    backgroundColor: 'rgba(217, 119, 6, 0.9)', // CONNECT primary theme
    borderRadius: 28,
    padding: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  promoTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  promoSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
    lineHeight: 18,
  },
  applyBtn: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    elevation: 0,
  },
  applyBtnLabel: {
    color: '#D97706',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
