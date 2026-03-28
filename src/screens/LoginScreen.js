import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, Alert, StatusBar, ImageBackground } from 'react-native';
import { Text, Button, IconButton, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { auth } from '../services/auth';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_DARK = '#1A1C1E';
const GHOST_WHITE = '#F8F9FA';
const ACCENT_BLUE = '#3B82F6';

export const LoginScreen = ({ navigation }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authStatus, setAuthStatus] = useState('Continue with Google');

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setAuthStatus('Authenticating...');
    try {
      await auth.signInWithGoogle();
      setAuthStatus('Synchronizing Hub...');
      navigation.replace('Main');
    } catch (error) {
      console.warn("Google Login Error:", error);
      setAuthStatus('Continue with Google');
      Alert.alert(
        "Authentication Note", 
        "The integrity check encountered a delay. Please initialize the broadcast again in 10 seconds.",
        [{ text: "Acknowledged" }]
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* MONOLITHIC ENTRY HEADER */}
      <View style={styles.topSection}>
        <View style={styles.logoHub}>
          <Text style={styles.logoChar}>C</Text>
        </View>
        <Text style={styles.brandTitle}>CONNECT</Text>
        <Text style={styles.brandSubtitle}>COMMUNITY ARCHITECT 4.0</Text>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.authHub}>
          <View style={styles.hubHeader}>
             <Text style={styles.hubTitle}>Establish Identity</Text>
             <Text style={styles.hubDesc}>
               Join the global network of community architects and verified impact organizations.
             </Text>
          </View>

          <View style={styles.actionLayer}>
            <TouchableOpacity 
              style={[styles.googleButton, isLoggingIn && styles.buttonDisabled]} 
              onPress={handleLogin}
              disabled={isLoggingIn}
              activeOpacity={0.9}
            >
              <View style={styles.googleIconBox}>
                 <MaterialCommunityIcons name="google" size={20} color={PRIMARY_DARK} />
              </View>
              <Text style={styles.googleButtonText}>{authStatus}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportLink} activeOpacity={0.7}>
              <Text style={styles.supportLinkText}>Architectural Support & Recovery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.legalText}>
          By initializing, you accept our 
          <Text style={styles.legalActive}> Protocol </Text> & 
          <Text style={styles.legalActive}> Data Privacy </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.12,
  },
  logoHub: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 15,
    shadowColor: PRIMARY_DARK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  logoChar: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '910',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '1000',
    color: PRIMARY_DARK,
    letterSpacing: 8,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '910',
    color: '#94A3B8',
    marginTop: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  contentSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  authHub: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35, // Luxury Hub Radius
    padding: 32,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  hubHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  hubTitle: {
    fontSize: 26,
    fontWeight: '1000',
    color: PRIMARY_DARK,
    letterSpacing: -1,
    marginBottom: 12,
  },
  hubDesc: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  actionLayer: {
    width: '100%',
  },
  googleButton: {
    height: 70,
    backgroundColor: PRIMARY_DARK,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    elevation: 12,
    shadowColor: PRIMARY_DARK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  buttonDisabled: {
    opacity: 0.85,
  },
  googleIconBox: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '910',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  supportLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  supportLinkText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  legalText: {
    fontSize: 11,
    color: '#CBD5E1',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  legalActive: {
    color: PRIMARY_DARK,
    fontWeight: '1000',
  }
});
