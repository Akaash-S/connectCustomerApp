import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const NotificationCard = ({ item, onPress }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'Requests': return 'handshake-outline';
      case 'Events': return 'calendar-star';
      case 'NGOs': return 'office-building-marker-outline';
      case 'System': return 'shield-check-outline';
      default: return 'bell-outline';
    }
  };

  const getIconColor = () => {
    switch (item.type) {
      case 'Requests': return '#3B82F6'; // Blue
      case 'Events': return '#7C3AED'; // Indigo
      case 'NGOs': return '#10B981'; // Emerald
      case 'System': return '#1A1C1E'; // Dark
      default: return '#64748B'; // Slate
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
      <Surface style={[styles.card, !item.read && styles.unreadCard]} elevation={0}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: getIconColor() + '10' }]}>
            <MaterialCommunityIcons name={getIcon()} size={22} color={getIconColor()} />
          </View>
          
          <View style={styles.textSection}>
            <View style={styles.headerRow}>
              <Text style={[styles.title, !item.read && styles.unreadTitle]} numberOfLines={1}>
                 {item.title}
              </Text>
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.footer}>
               <Text style={styles.time}>{item.time}</Text>
               <Text style={styles.typeTag}>{item.type}</Text>
            </View>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
     marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32, // Luxury Rounded List Item
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  unreadCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 18, // Master Icon Box Radius
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textSection: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '910',
    color: '#1A1C1E',
    flex: 1,
    letterSpacing: -0.3,
  },
  unreadTitle: {
    color: '#000000',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginLeft: 12,
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    fontWeight: '600',
  },
  footer: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     marginTop: 12,
  },
  time: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '800',
  },
  typeTag: {
     fontSize: 9,
     fontWeight: '900',
     color: '#94A3B8',
     textTransform: 'uppercase',
     letterSpacing: 1,
  }
});
