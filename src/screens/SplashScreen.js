import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export const SplashScreen = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500); // 2.5 seconds splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.logoPlaceholder, { backgroundColor: theme.colors.primary }]}>
          <Text variant="headlineLarge" style={styles.logoText}>C</Text>
        </View>
        <Text variant="displaySmall" style={styles.appName}>CONNECT</Text>
        <Text variant="bodyLarge" style={styles.tagline}>
          Connecting Communities Through Volunteering
        </Text>
      </View>
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  logoText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  appName: {
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#1E4D2B',
  },
  tagline: {
    marginTop: 10,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  }
});
