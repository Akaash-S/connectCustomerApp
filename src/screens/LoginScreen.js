import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const LoginScreen = ({ navigation }) => {
  const theme = useTheme();

  const handleLogin = () => {
    // In a real app, this would handle Google Sign-In
    navigation.replace('Main');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.topSection}>
        <View style={[styles.logoSmall, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.logoTextSmall}>C</Text>
        </View>
        <Text variant="headlineMedium" style={styles.welcomeText}>Welcome to CONNECT</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Sign in to start making an impact in your community today.
        </Text>
      </View>

      <View style={styles.middleSection}>
        <Button 
          mode="contained" 
          onPress={handleLogin} 
          style={styles.loginBtn}
          contentStyle={styles.btnContent}
          buttonColor="#FFF"
          textColor="#444"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="google" size={24} color="#DB4437" />
          )}
        >
          Continue with Google
        </Button>
      </View>

      <View style={styles.bottomSection}>
        <Text variant="bodySmall" style={styles.privacyText}>
          By continuing, you agree to our 
          <Text style={{ color: theme.colors.secondary, fontWeight: 'bold' }}> Terms </Text> 
          and 
          <Text style={{ color: theme.colors.secondary, fontWeight: 'bold' }}> Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
  },
  topSection: {
    marginTop: 80,
    alignItems: 'center',
  },
  logoSmall: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoTextSmall: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 22,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  loginBtn: {
    borderRadius: 15,
    elevation: 3,
  },
  btnContent: {
    height: 56,
  },
  bottomSection: {
    marginBottom: 30,
  },
  privacyText: {
    textAlign: 'center',
    color: '#9CA3AF',
  }
});
