import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Button, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const ProfileHeader = ({ name, location, memberSince, isVerified, onEdit }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image 
          size={100} 
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} 
        />
        {isVerified && (
          <View style={[styles.verifiedBadge, { backgroundColor: '#3B82F6' }]}>
            <MaterialCommunityIcons name="check-decagram" size={20} color="#FFF" />
          </View>
        )}
      </View>
      
      <Text variant="headlineSmall" style={styles.name}>{name}</Text>
      <View style={styles.locationRow}>
        <MaterialCommunityIcons name="map-marker" size={16} color={theme.colors.secondary} />
        <Text variant="bodyMedium" style={styles.location}>{location}</Text>
      </View>
      <Text variant="labelSmall" style={styles.memberSince}>Member since {memberSince}</Text>
      
      <Button 
        mode="outlined" 
        onPress={onEdit} 
        style={styles.editButton}
        labelStyle={styles.editButtonLabel}
        icon="account-edit-outline"
      >
        Edit Profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 4,
    shadowColor: '#1E4D2B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  avatarContainer: {
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
    padding: 2,
  },
  name: {
    fontWeight: '900',
    marginTop: 15,
    color: '#1A1C1E',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '600',
  },
  memberSince: {
    color: '#9CA3AF',
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  editButton: {
    marginTop: 20,
    borderRadius: 14,
    borderColor: '#E5E7EB',
    borderWidth: 1.5,
    paddingHorizontal: 10,
  },
  editButtonLabel: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
