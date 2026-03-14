import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { Text } from 'react-native-paper';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const MeshBackground = () => (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF9F0' }]}>
      <View style={[styles.blob, { top: -100, left: -50, backgroundColor: 'rgba(217, 119, 6, 0.2)', width: 350, height: 350 }]} />
      <View style={[styles.blob, { bottom: -50, right: -50, backgroundColor: 'rgba(16, 185, 129, 0.2)', width: 450, height: 450 }]} />
    </View>
  );

  return (
    <View style={styles.container}>
      <MeshBackground />
      
      <Animated.View style={[styles.logoContainer, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
        <BlurView intensity={60} tint="light" style={styles.glassLogo}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>C</Text>
          </View>
          <Text style={styles.appName}>CONNECT</Text>
          <Text style={styles.tagline}>COMMUNITY POWERED</Text>
        </BlurView>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>BE THE CHANGE</Text>
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
  blob: {
    position: 'absolute',
    borderRadius: 250,
    opacity: 0.6,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassLogo: {
    paddingHorizontal: 40,
    paddingVertical: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 30,
    backgroundColor: '#D97706',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  iconText: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: '900',
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A1C1E',
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '900',
    color: '#6B7280',
    marginTop: 8,
    letterSpacing: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#D97706',
    letterSpacing: 5,
    opacity: 0.6,
  }
});
