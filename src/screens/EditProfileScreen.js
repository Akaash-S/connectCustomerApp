import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Text, TextInput, Avatar, Divider, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  const CustomHeader = () => (
    <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
       <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1A1C1E" />
       </TouchableOpacity>
       <View>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Text style={styles.headerSub}>Customize community persona</Text>
       </View>
       <View style={{ width: 44 }} />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader />
      
      {isLoading ? (
        <View style={styles.centerLoader}>
           <ActivityIndicator color="#1A1C1E" size="large" />
        </View>
      ) : (
        <ScrollView 
          style={styles.container} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
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

          {/* FORM SECTIONS (MASTER RHYTHM 40PX) */}
          <View style={styles.formContainer}>
             <Text style={styles.sectionHeader}>Personal Manifest</Text>
             
             <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Display Name</Text>
                <TextInput
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  style={styles.input}
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  placeholder="Enter full name"
                  placeholderTextColor="#94A3B8"
                />
             </View>

             <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contact Phone</Text>
                <TextInput
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  style={styles.input}
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  keyboardType="phone-pad"
                  placeholder="+91 XXXX XXXX"
                  placeholderTextColor="#94A3B8"
                />
             </View>

             <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location Base</Text>
                <TextInput
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                  style={styles.input}
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  placeholder="City, Country"
                  placeholderTextColor="#94A3B8"
                />
             </View>

             <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Impact Bio</Text>
                <TextInput
                  value={formData.bio}
                  onChangeText={(text) => setFormData({ ...formData, bio: text })}
                  style={[styles.input, { height: 120, paddingTop: 16 }]}
                  mode="flat"
                  multiline
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  placeholder="Share your passion for community support..."
                  placeholderTextColor="#94A3B8"
                />
             </View>

             {/* SIGNATURE ACTION */}
             <TouchableOpacity 
                style={[styles.saveBtn, isSaving && { opacity: 0.7 }]} 
                onPress={handleSave}
                disabled={isSaving}
                activeOpacity={0.8}
             >
                {isSaving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <MaterialCommunityIcons name="check-circle" size={20} color="#FFFFFF" />
                    <Text style={styles.saveText}>Commmit Changes</Text>
                  </>
                )}
             </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 40, // Master Rhythm
    gap: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 18, // Geometric Family
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 2,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 40, // Master Rhythm
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
    backgroundColor: '#1A1C1E',
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
  formContainer: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24, // Internal Rhythm
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1A1C1E',
    marginBottom: 10,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20, // Form Geometric Radius
    borderWidth: 1,
    borderColor: '#F1F5F9',
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1C1E',
    paddingHorizontal: 4, // TextInput inside handles padding
  },
  saveBtn: {
    marginTop: 16,
    backgroundColor: '#1A1C1E',
    height: 65,
    borderRadius: 35, // Master Premium Radius
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '910',
    letterSpacing: -0.5,
  }
});
