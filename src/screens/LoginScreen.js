import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, Alert, StatusBar } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { auth } from '../services/auth';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const LoginScreen = ({ navigation }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authStatus, setAuthStatus] = useState('Continue with Google');

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setAuthStatus('Signing in...');
    try {
      await auth.signInWithGoogle();
      setAuthStatus('Syncing Profile...');
      navigation.replace('Main');
    } catch (error) {
      console.warn("Google Login Error:", error);
      setAuthStatus('Continue with Google');
      Alert.alert(
        "Login Note", 
        "We couldn't sync your profile with the server right now (it might be waking up). Please try once more in 10 seconds.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.topSection}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoChar}>C</Text>
        </View>
        <Text style={styles.brandName}>CONNECT</Text>
        <Text style={styles.brandTagline}>COMMUNITY POWERED</Text>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome Home</Text>
          <Text style={styles.welcomeSubtext}>
            Join thousands of volunteers and organizations making a real difference in Chennai every day.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.googleBtn, isLoggingIn && styles.googleBtnDisabled]} 
              onPress={handleLogin}
              disabled={isLoggingIn}
            >
              <MaterialCommunityIcons name="google" size={24} color="#FFFFFF" />
              <Text style={styles.googleBtnText}>{authStatus}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.troubleBtn}>
              <Text style={styles.troubleText}>Trouble signing in?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our 
          <Text style={styles.legalLink}> Terms </Text> & 
          <Text style={styles.legalLink}> Privacy </Text>
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
    paddingVertical: 60,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#1A1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  logoChar: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: '900',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1A1C1E',
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  brandTagline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    marginTop: 8,
    letterSpacing: 3,
  },
  contentSection: {
    paddingHorizontal: 24,
  },
  welcomeCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 40,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1C1E',
    textAlign: 'center',
  },
  welcomeSubtext: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
  },
  googleBtn: {
    height: 70,
    backgroundColor: '#1A1C1E',
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  googleBtnDisabled: {
    opacity: 0.8,
  },
  googleBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  troubleBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  troubleText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  legalLink: {
    color: '#1A1C1E',
    fontWeight: '800',
  }
});
