import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ProfileSubScreenWrapper = ({ title, children, navigation, footer }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const MeshBackground = () => (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF9F0' }]}>
      <View style={[styles.blob, { top: -100, right: -50, backgroundColor: 'rgba(217, 119, 6, 0.08)', width: 300, height: 300 }]} />
      <View style={[styles.blob, { bottom: -100, left: -50, backgroundColor: 'rgba(16, 185, 129, 0.08)', width: 300, height: 300 }]} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MeshBackground />
      
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <IconButton 
          icon="arrow-left" 
          mode="contained" 
          containerColor="#FFF" 
          iconColor="#1A1C1E"
          size={24}
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
          activeOpacity={1}
        />
        <Text variant="titleLarge" style={styles.headerTitle}>{title}</Text>
        <View width={48} />
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {footer && (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          {footer}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120, // Increased to clear tab bar
  },
  blob: {
    position: 'absolute',
    borderRadius: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  headerTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  backBtn: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footer: {
    padding: 20,
    backgroundColor: 'transparent',
  }
});
