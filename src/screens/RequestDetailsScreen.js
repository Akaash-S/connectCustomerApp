import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

export const RequestDetailsScreen = ({ route, navigation }) => {
  const { requestId } = route.params || {};
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    if (!requestId) return;
    const fetchDetails = async () => {
      try {
        const data = await api.getRequestDetails(requestId);
        setRequest(data);
      } catch (error) {
        console.warn("API Error (RequestDetails):", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [requestId]);

  const handleHighlight = async () => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      const result = await api.voteRequest(requestId);
      setRequest(prev => ({ ...prev, votes: result.votes }));
    } catch (error) {
       Alert.alert("Highlight Failed", "You might have already highlighted this need.");
    } finally {
      setIsVoting(false);
    }
  };

  const handleDonate = () => {
    Alert.prompt(
      "Support with Funds",
      "Enter the amount you would like to contribute and help resolve this community need.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Contribute", 
          onPress: async (amount) => {
            if (!amount || isNaN(amount)) return;
            try {
              await api.donateToRequest(requestId, parseFloat(amount));
              Alert.alert("Thank You!", "Your contribution has been logged for community impact.");
            } catch (err) {
              Alert.alert("Error", "Failed to process contribution.");
            }
          }
        }
      ],
      "plain-text"
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#F59E0B';
      case 'URGENT': return '#EF4444';
      case 'COMPLETED': return '#10B981';
      default: return '#3B82F6';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="#1A1C1E" />
      </View>
    );
  }

  if (!request) {
    return (
      <ProfileSubScreenWrapper title="Details" navigation={navigation}>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="database-off-outline" size={60} color="#F1F5F9" />
          <Text style={styles.emptyText}>No Data Found</Text>
        </View>
      </ProfileSubScreenWrapper>
    );
  }

  return (
    <View style={styles.mainContainer}>
       <ProfileSubScreenWrapper 
          title="Community Need" 
          subtitle={`Ticket ID: ${request.id?.slice(0, 8).toUpperCase()}`} 
          navigation={navigation}
       >
          <StatusBar barStyle="dark-content" />
          
          {/* HERO CARD (HUB STYLE) */}
          <View style={styles.heroCard}>
            <View style={styles.cardHeader}>
               <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{request.category || 'COMMUNITY'}</Text>
               </View>
               <View style={[styles.statusPill, { backgroundColor: getStatusColor(request.status) + '15' }]}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(request.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>{request.status || 'ACTIVE'}</Text>
               </View>
            </View>
            
            <Text style={styles.title}>{request.title}</Text>
            
            <View style={styles.metaGrid}>
               <View style={styles.metaItem}>
                  <View style={styles.metaIconCircle}>
                     <MaterialCommunityIcons name="map-marker-outline" size={20} color="#1A1C1E" />
                  </View>
                  <View>
                     <Text style={styles.metaLabel}>LOCATION</Text>
                     <Text style={styles.metaValue}>{request.location || 'Chennai'}</Text>
                  </View>
               </View>
               <View style={styles.metaItem}>
                  <View style={styles.metaIconCircle}>
                     <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={20} color="#1A1C1E" />
                  </View>
                  <View>
                     <Text style={styles.metaLabel}>COMMUNITY SUPPORT</Text>
                     <Text style={styles.metaValue}>{request.votes || 0} People Highlighted</Text>
                  </View>
               </View>
            </View>

            <Divider style={styles.divider} />
            
            <Text style={styles.sectionLabel}>SITUATION DESCRIPTION</Text>
            <Text style={styles.description}>{request.description}</Text>
          </View>

          {/* ACTION HUB (PEER TO PEER) */}
          <View style={styles.actionHub}>
             <TouchableOpacity style={styles.highlightBtn} onPress={handleHighlight} activeOpacity={0.7} disabled={isVoting}>
                <MaterialCommunityIcons 
                   name={isVoting ? "loading" : "arrow-up-bold-outline"} 
                   size={28} 
                   color="#3B82F6" 
                />
                <Text style={styles.highlightText}>Highlight Need</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.donateBtn} onPress={handleDonate} activeOpacity={0.7}>
                <MaterialCommunityIcons name="heart-flash" size={28} color="#E11D48" />
                <Text style={styles.donateText}>Support Funds</Text>
             </TouchableOpacity>
          </View>

          {/* EVIDENCE GALLERY */}
          {(request.media && request.media.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contextual Evidence</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.evidenceGallery}>
                {request.media.map((img, index) => (
                  <Image key={index} source={{ uri: img }} style={styles.evidenceImage} />
                ))}
              </ScrollView>
            </View>
          )}

          {/* LOCATION PREVIEW */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Incident Perimeter</Text>
            <View style={styles.mapCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600' }} 
                style={styles.mapImage} 
              />
              <View style={styles.mapFooter}>
                <MaterialCommunityIcons name="map-marker-radius" size={24} color="#3B82F6" />
                <Text style={styles.mapFooterText}>{request.location || 'Reported Location'}</Text>
                <TouchableOpacity style={styles.navBtn}>
                   <Text style={styles.navBtnText}>NAVIGATE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ height: 100 }} />
       </ProfileSubScreenWrapper>

       {/* FLOATING ACTION */}
       <View style={[styles.floatingAction, { paddingBottom: 24 }]}>
          <TouchableOpacity style={styles.mainActionBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Events')}>
             <MaterialCommunityIcons name="account-group" size={20} color="#FFFFFF" />
             <Text style={styles.mainActionText}>Find Supporting NGOs</Text>
          </TouchableOpacity>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '910',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '910',
  },
  title: {
    fontSize: 22,
    fontWeight: '910',
    color: '#1A1C1E',
    marginBottom: 25,
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  metaGrid: {
    gap: 18,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '910',
    color: '#1A1C1E',
    marginTop: 2,
  },
  divider: {
    marginVertical: 25,
    backgroundColor: '#F8F9FA',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 25,
    fontWeight: '600',
  },
  actionHub: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 35,
  },
  highlightBtn: {
    flex: 1,
    height: 100,
    backgroundColor: '#F0F9FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '910',
    color: '#3B82F6',
    marginTop: 8,
  },
  donateBtn: {
    flex: 1,
    height: 100,
    backgroundColor: '#FFF1F2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },
  donateText: {
    fontSize: 13,
    fontWeight: '910',
    color: '#E11D48',
    marginTop: 8,
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '910',
    color: '#1A1C1E',
    marginBottom: 18,
  },
  evidenceGallery: {
    flexDirection: 'row',
  },
  evidenceImage: {
    width: 200,
    height: 140,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F8F9FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  mapImage: {
    width: '100%',
    height: 160,
  },
  mapFooter: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mapFooterText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '910',
    color: '#1A1C1E',
  },
  navBtn: {
    backgroundColor: '#1A1C1E',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  navBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  floatingAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  mainActionBtn: {
    backgroundColor: '#1A1C1E',
    height: 60,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  mainActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '910',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '800',
    color: '#94A3B8',
  }
});
