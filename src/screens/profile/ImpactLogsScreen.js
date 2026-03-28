import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../../services/api';

export const ImpactLogsScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const data = await api.getUserActivity();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const renderLogItem = ({ item, index }) => (
    <View style={styles.logItem}>
       <View style={styles.timelineContainer}>
          <View style={styles.dotContainer}>
             <View style={[styles.dot, { backgroundColor: item.color || '#CBD5E1' }]} />
             {index < logs.length - 1 && <View style={styles.line} />}
          </View>
       </View>
       
       <View style={styles.contentCard}>
          <View style={styles.cardHeader}>
             <View style={[styles.iconBox, { backgroundColor: (item.color || '#1A1C1E') + '10' }]}>
                <MaterialCommunityIcons name={item.icon || 'history'} size={20} color={item.color || '#1A1C1E'} />
             </View>
             <View style={styles.metaContainer}>
                <Text style={styles.actionText}>{item.action}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
             </View>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.cardFooter}>
             <Text style={styles.footerText}>Verified Impact Event</Text>
             <MaterialCommunityIcons name="shield-check" size={14} color="#10B981" />
          </View>
       </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
       <ProfileSubScreenWrapper 
          title="Impact Logs" 
          subtitle="Your community journey" 
          navigation={navigation}
       >
          {isLoading ? (
            <View style={styles.loader}>
               <ActivityIndicator color="#1A1C1E" size="large" />
            </View>
          ) : (
            <FlatList
              data={logs}
              renderItem={renderLogItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Managed by Wrapper
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                   <MaterialCommunityIcons name="history" size={60} color="#F1F5F9" />
                   <Text style={styles.emptyText}>No impact logs yet.</Text>
                </View>
              }
            />
          )}
          <View style={{ height: 40 }} />
       </ProfileSubScreenWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loader: {
    padding: 100,
    alignItems: 'center',
  },
  listContent: {
    paddingTop: 0,
  },
  logItem: {
    flexDirection: 'row',
    gap: 0,
  },
  timelineContainer: {
    width: 40,
    alignItems: 'center',
  },
  dotContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 10,
    marginTop: 24,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#F1F5F9',
    marginTop: -2,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaContainer: {
    flex: 1,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '910',
    color: '#1A1C1E',
  },
  dateText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F8F9FA',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginTop: 12,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#10B981',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emptyContainer: {
     alignItems: 'center',
     marginTop: 60,
  },
  emptyText: {
     marginTop: 20,
     color: '#CBD5E1',
     fontWeight: '800',
     fontSize: 16,
  }
});
