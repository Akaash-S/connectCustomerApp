import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { supabase } from '../services/supabase';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY_DARK = '#1A1C1E';
const GHOST_WHITE = '#F8F9FA';

export const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const lineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(lineAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    const checkSessionAndNavigate = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Luxury timing for brand presence
        setTimeout(() => {
          if (session) {
            navigation.replace('Main');
          } else {
            navigation.replace('Login');
          }
        }, 3000);
      } catch (error) {
        console.error("Session check error:", error);
        navigation.replace('Login');
      }
    };

    checkSessionAndNavigate();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Animated.View style={[styles.mainHub, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.logoBox}>
             <Text style={styles.logoChar}>C</Text>
          </View>
          
          <View style={styles.titleGroup}>
             <Text style={styles.appName}>CONNECT</Text>
             <Text style={styles.tagline}>COMMUNITY ARCHITECT</Text>
          </View>

          <View style={styles.integrityBarContainer}>
             <Animated.View 
               style={[
                 styles.integrityBar, 
                 { 
                   width: lineAnim.interpolate({
                     inputRange: [0, 1],
                     outputRange: ['0%', '100%']
                   }) 
                 }
               ]} 
             />
          </View>
      </Animated.View>

      <View style={styles.footer}>
         <Text style={styles.footerToken}>EST. 2026 • VERSION 4.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHub: {
    alignItems: 'center',
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 28, // Luxury Radius
    backgroundColor: PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 20,
    shadowColor: PRIMARY_DARK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  logoChar: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '910',
  },
  titleGroup: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: '1000',
    color: PRIMARY_DARK,
    letterSpacing: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    letterSpacing: 2,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  integrityBarContainer: {
    width: 120,
    height: 3,
    backgroundColor: GHOST_WHITE,
    borderRadius: 2,
    overflow: 'hidden',
  },
  integrityBar: {
    height: '100%',
    backgroundColor: PRIMARY_DARK,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
  },
  footerToken: {
    fontSize: 10,
    fontWeight: '910',
    color: '#CBD5E1',
    letterSpacing: 2,
  }
});
