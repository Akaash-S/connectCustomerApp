import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const ProfileSubScreenWrapper = ({ title, subtitle, children, navigation, footer }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {/* INTEGRATED SINGLE-LAYER HEADER */}
        <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backPill}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#1A1C1E" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
               <Text style={styles.headerTitle}>{title}</Text>
               {subtitle && <Text style={styles.headerSub}>{subtitle}</Text>}
            </View>
            <View style={{ width: 44 }} />
        </View>

        <View style={styles.childrenContainer}>
           {children}
        </View>
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 25,
  },
  backPill: {
    width: 44,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '910',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  childrenContainer: {
    paddingHorizontal: 24,
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  }
});
