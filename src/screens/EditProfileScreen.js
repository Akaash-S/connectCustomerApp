import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Text, TextInput, Avatar, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { api } from '../services/api';
import { ProfileSubScreenWrapper } from '../components/ProfileSubScreenWrapper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY_DARK = '#1A1C1E';
const ACCENT_BLUE = '#3B82F6';

export const EditProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatarUrl: null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getUserProfile();
        if (data) {
          setFormData({
            name: data.fullName || '',
            email: data.email || '',
            phone: data.stats?.phone || '',
            location: data.location || '',
            bio: data.bio || '',
            avatarUrl: data.avatarUrl
          });
        }
      } catch (error) {
        console.warn("API Error (EditProfile):", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Location access is needed to sync your community base.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let reverse = await Location.reverseGeocodeAsync(location.coords);
      if (reverse && reverse.length > 0) {
        const addr = `${reverse[0].district || reverse[0].city || 'Chennai'}, ${reverse[0].region || 'India'}`;
        setFormData(prev => ({ ...prev, location: addr }));
      }
    } catch (err) {
      console.warn("Location Error:", err);
      Alert.alert("Sync Failed", "Unable to detect high-fidelity location pulse.");
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.syncUser({
        fullName: formData.name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio
      });
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
       Alert.alert("Error", "Failed to save profile changes.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProfileSubScreenWrapper 
      title="Edit Profile" 
      subtitle="Customize community persona"
      navigation={navigation}
      footer={
        <Button 
          mode="contained" 
          onPress={handleSave} 
          loading={isSaving}
          disabled={isSaving}
          style={styles.saveBtn}
          contentStyle={styles.saveBtnContent}
          labelStyle={styles.saveBtnLabel}
        >
          Synchronize Changes
        </Button>
      }
    >
      {isLoading ? (
        <View style={styles.centerLoader}>
           <ActivityIndicator color={PRIMARY_DARK} size="large" />
        </View>
      ) : (
        <View style={styles.formContainer}>
          {/* AVATAR SECTION */}
          <View style={styles.avatarSection}>
             <View style={styles.avatarWrapper}>
                <Avatar.Image 
                  size={120} 
                  source={{ uri: formData.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} 
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
                   <MaterialCommunityIcons name="camera" size={20} color="#FFFFFF" />
                </TouchableOpacity>
             </View>
             <Text style={styles.photoTip}>Touch camera to update photo</Text>
          </View>

          {/* FORM SECTIONS */}
          <View style={styles.inputGroup}>
             <Text style={styles.inputLabel}>Display Name</Text>
             <TextInput
               value={formData.name}
               onChangeText={(text) => setFormData({ ...formData, name: text })}
               style={styles.input}
               mode="outlined"
               outlineColor="#F1F5F9"
               activeOutlineColor={PRIMARY_DARK}
               placeholder="Enter full name"
               placeholderTextColor="#94A3B8"
               textColor={PRIMARY_DARK}
             />
          </View>

          <View style={styles.inputGroup}>
             <Text style={styles.inputLabel}>Contact Phone</Text>
             <TextInput
               value={formData.phone}
               onChangeText={(text) => setFormData({ ...formData, phone: text })}
               style={styles.input}
               mode="outlined"
               outlineColor="#F1F5F9"
               activeOutlineColor={PRIMARY_DARK}
               keyboardType="phone-pad"
               placeholder="+91 XXXX XXXX"
               placeholderTextColor="#94A3B8"
               textColor={PRIMARY_DARK}
             />
          </View>

          <View style={styles.inputGroup}>
             <Text style={styles.inputLabel}>Location Base</Text>
             <TextInput
               value={formData.location}
               onChangeText={(text) => setFormData({ ...formData, location: text })}
               style={styles.input}
               mode="outlined"
               outlineColor="#F1F5F9"
               activeOutlineColor={PRIMARY_DARK}
               placeholder="Detecting..."
               placeholderTextColor="#94A3B8"
               textColor={PRIMARY_DARK}
               right={<TextInput.Icon 
                        icon={isDetectingLocation ? () => <ActivityIndicator size="small" color={ACCENT_BLUE} /> : "map-marker-radius"} 
                        onPress={detectLocation}
                        color={ACCENT_BLUE} 
                      />}
             />
          </View>

          <View style={styles.inputGroup}>
             <Text style={styles.inputLabel}>Biography</Text>
             <TextInput
               value={formData.bio}
               onChangeText={(text) => setFormData({ ...formData, bio: text })}
               style={[styles.input, styles.textArea]}
               mode="outlined"
               outlineColor="#F1F5F9"
               activeOutlineColor={PRIMARY_DARK}
               multiline
               numberOfLines={5}
               placeholder="Tell the community about your mission..."
               placeholderTextColor="#94A3B8"
               textColor={PRIMARY_DARK}
             />
          </View>
        </View>
      )}
    </ProfileSubScreenWrapper>
  );
};

const styles = StyleSheet.create({
  centerLoader: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    backgroundColor: '#F8F9FA',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: PRIMARY_DARK,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  photoTip: {
    marginTop: 16,
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: PRIMARY_DARK,
    marginBottom: 10,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28, // Luxury 4.0 Rounded Corners
    fontSize: 15,
    fontWeight: '700',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: PRIMARY_DARK,
    height: 65,
    borderRadius: 35, // Master Premium Radius
    justifyContent: 'center',
  },
  saveBtnContent: {
    height: 65,
  },
  saveBtnLabel: {
    fontSize: 16,
    fontWeight: '910',
    letterSpacing: -0.5,
    color: '#FFFFFF',
  }
});
