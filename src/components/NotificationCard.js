import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const NotificationCard = ({ item, onPress, onMarkRead, onDelete }) => {
  const theme = useTheme();
  
  const getIcon = () => {
    switch (item.type) {
      case 'Requests': return 'handshake-outline';
      case 'Events': return 'calendar-star';
      case 'NGOs': return 'office-building-marker';
      case 'System': return 'cog-outline';
      default: return 'bell-outline';
    }
  };

  const getIconColor = () => {
    switch (item.type) {
      case 'Requests': return '#3B82F6';
      case 'Events': return '#D97706';
      case 'NGOs': return '#10B981';
      case 'System': return '#6B7280';
      default: return '#D97706';
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Surface style={[styles.card, !item.read && styles.unreadCard]} elevation={item.read ? 1 : 4}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: getIconColor() + '15' }]}>
            <MaterialCommunityIcons name={getIcon()} size={24} color={getIconColor()} />
          </View>
          
          <View style={styles.textSection}>
            <View style={styles.headerRow}>
              <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    marginVertical: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  unreadCard: {
    borderColor: 'rgba(217, 119, 6, 0.2)',
    backgroundColor: '#FFFBF5',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
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
    fontWeight: '700',
    color: '#374151',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '900',
    color: '#111827',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    fontWeight: '500',
  },
  time: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 8,
    fontWeight: '700',
  }
});
