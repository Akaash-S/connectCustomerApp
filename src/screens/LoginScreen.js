import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#D97706';

export const LoginScreen = ({ navigation }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Gentle floating animation for the card
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLogin = () => {
    navigation.replace('Main');
  };

  const MeshBackground = () => (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF9F0' }]}>
      <View style={[styles.blob, { top: -100, left: -50, backgroundColor: 'rgba(217, 119, 6, 0.15)', width: 350, height: 350 }]} />
      <View style={[styles.blob, { bottom: SCREEN_HEIGHT * 0.2, right: -100, backgroundColor: 'rgba(16, 185, 129, 0.12)', width: 400, height: 400 }]} />
      <View style={[styles.blob, { top: SCREEN_HEIGHT * 0.4, left: -100, backgroundColor: 'rgba(59, 130, 246, 0.08)', width: 250, height: 250 }]} />
    </View>
  );

  const cardTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <View style={styles.container}>
      <MeshBackground />
      
      <Animated.View style={[styles.loginCardContainer, { transform: [{ translateY: cardTranslateY }] }]}>
        <BlurView intensity={50} tint="light" style={styles.glassCard}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoChar}>C</Text>
          </View>
          
          <Text style={styles.welcomeText}>Welcome Home</Text>
          <Text style={styles.subtitle}>
            Join the movement. Connect with NGOs and start volunteering in seconds.
          </Text>

          <View style={styles.actionSection}>
            <Button 
              mode="contained" 
              onPress={handleLogin} 
              style={styles.googleBtn}
              contentStyle={styles.googleBtnContent}
              labelStyle={styles.googleBtnLabel}
              icon={({ size }) => (
                <View style={styles.googleIconCircle}>
                  <MaterialCommunityIcons name="google" size={20} color="#EA4335" />
                </View>
              )}
            >
              Continue with Google
            </Button>
            
            <TouchableOpacity style={styles.alternateOption}>
              <Text style={styles.alternateText}>Trouble signing in?</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View>

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  blob: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.6,
  },
  loginCardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  glassCard: {
    width: '100%',
    borderRadius: 40,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 5,
  },
  logoChar: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1C1E',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  actionSection: {
    width: '100%',
    marginTop: 40,
  },
  googleBtn: {
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  googleBtnContent: {
    height: 64,
    flexDirection: 'row-reverse',
  },
  googleBtnLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 12,
  },
  googleIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alternateOption: {
    marginTop: 20,
    alignItems: 'center',
  },
  alternateText: {
    fontSize: 13,
    color: PRIMARY_COLOR,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  legalLink: {
    color: '#6B7280',
    fontWeight: 'bold',
  }
});
