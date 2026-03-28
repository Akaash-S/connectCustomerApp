import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Avatar, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

export const EditProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  const [formData, setFormData] = useState({
    name: 'Akash',
    email: 'akash@example.com',
    phone: '+91 9876543210',
    location: 'Chennai, India',
    bio: 'Dedicated volunteer passionate about environment and community growth.',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getUserProfile();
        if (data) {
          setFormData({
            name: data.fullName || data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            bio: data.bio || ''
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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Logic for updating profile (using syncUser as proxy for update)
      await api.syncUser({
        fullName: formData.name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio
      });
      navigation.goBack();
    } catch (error) {
      console.warn("API Error (SaveProfile):", error);
    } finally {
      setIsSaving(false);
    }
  };

  const MeshBackground = () => (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF9F0' }]}>
      <View style={[styles.blob, { top: -50, right: -50, backgroundColor: 'rgba(217, 119, 6, 0.08)', width: 250, height: 250 }]} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MeshBackground />
      
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
          <IconButton 
            icon="arrow-left" 
            mode="contained" 
            containerColor="#FFF" 
            onPress={() => navigation.goBack()} 
            activeOpacity={1}
          />
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View width={48} />
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Avatar.Image size={120} source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} />
            <TouchableOpacity style={styles.cameraBtn}>
              <MaterialCommunityIcons name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoTip}>Touch icon to change photo</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Display Name</Text>
          <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            style={styles.input}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="#D97706"
          />

          <Text style={styles.inputLabel}>Hidden Email</Text>
          <TextInput
            value={formData.email}
            disabled
            style={[styles.input, styles.disabledInput]}
            mode="flat"
            underlineColor="transparent"
          />

          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            style={styles.input}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="#D97706"
            keyboardType="phone-pad"
          />

          <Text style={styles.inputLabel}>Current Location</Text>
          <TextInput
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
            style={styles.input}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="#D97706"
          />

          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            value={formData.bio}
            onChangeText={(text) => setFormData({ ...formData, bio: text })}
            style={[styles.input, { height: 100 }]}
            mode="flat"
            multiline
            underlineColor="transparent"
            activeUnderlineColor="#D97706"
          />

          <Button 
            mode="contained" 
            onPress={handleSave} 
            loading={isSaving}
            disabled={isSaving}
            style={styles.saveBtn}
            contentStyle={{ height: 60 }}
            activeOpacity={1}
          >
            Save Changes
          </Button>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1C1E',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarWrapper: {
    position: 'relative',
    padding: 5,
    borderRadius: 65,
    backgroundColor: '#FFF',
    elevation: 8,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#D97706',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  photoTip: {
    marginTop: 12,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
  },
  form: {
    padding: 24,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 56,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  disabledInput: {
    backgroundColor: '#F9FAFB',
    opacity: 0.7,
  },
  saveBtn: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#D97706',
    elevation: 8,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
