import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { ProfileSubScreenWrapper } from '../components/ProfileSubScreenWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { api } from '../services/api';

const PRIMARY_DARK = '#1A1C1E';
const ACCENT_BLUE = '#3B82F6';
const GHOST_WHITE = '#F8F9FA';

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
        <ActivityIndicator color={PRIMARY_DARK} />
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
          
          {/* HERO ARCHITECTURE CARD */}
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
            
            <View style={styles.metaRoll}>
               <View style={styles.metaHub}>
                  <View style={styles.metaIconCircle}>
                     <MaterialCommunityIcons name="map-marker-outline" size={20} color={PRIMARY_DARK} />
                  </View>
                  <View>
                     <Text style={styles.metaLabel}>LOCATION</Text>
                     <Text style={styles.metaValue}>{request.location || 'Chennai'}</Text>
                  </View>
               </View>
               <View style={styles.metaHub}>
                  <View style={styles.metaIconCircle}>
                     <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={20} color={PRIMARY_DARK} />
                  </View>
                  <View>
                     <Text style={styles.metaLabel}>COMMUNITY SUPPORT</Text>
                     <Text style={styles.metaValue}>{request.votes || 0} People Highlighted</Text>
                  </View>
               </View>
            </View>

            <Divider style={styles.cardDivider} />
            
            <Text style={styles.sectionLabel}>SITUATION DESCRIPTION</Text>
            <Text style={styles.description}>{request.description}</Text>
          </View>

          {/* PEER TO PEER ACTION HUB (SAME LAYER) */}
          <View style={styles.actionSection}>
             <Text style={styles.sectionLabel}>The Response</Text>
             <Text style={styles.sectionTitle}>Peer-to-Peer Support</Text>
             
             <View style={styles.actionGrid}>
                <TouchableOpacity style={styles.highlightHub} onPress={handleHighlight} activeOpacity={0.7} disabled={isVoting}>
                   <MaterialCommunityIcons 
                      name={isVoting ? "loading" : "arrow-up-bold-outline"} 
                      size={28} 
                      color={ACCENT_BLUE} 
                   />
                   <Text style={styles.highlightText}>Highlight Need</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.donateHub} onPress={handleDonate} activeOpacity={0.7}>
                   <MaterialCommunityIcons name="heart-flash" size={28} color="#E11D48" />
                   <Text style={styles.donateText}>Support Funds</Text>
                </TouchableOpacity>
             </View>
          </View>

          {/* EVIDENCE GALLERY HUB */}
          {(request.media && request.media.length > 0) && (
            <View style={styles.evidenceSection}>
              <Text style={styles.sectionLabel}>The Evidence</Text>
              <Text style={styles.sectionTitle}>Contextual Records</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaRoll}>
                {request.media.map((img, index) => (
                  <View key={index} style={styles.imageWrapper}>
                     <Image source={{ uri: img }} style={styles.evidenceImage} />
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* PERIMETER NAVIGATION */}
          <View style={styles.perimeterSection}>
            <Text style={styles.sectionLabel}>The Perimeter</Text>
            <Text style={styles.sectionTitle}>Incident Context</Text>
            <View style={styles.mapHub}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600' }} 
                style={styles.mapVisual} 
              />
              <View style={styles.mapFooter}>
                <MaterialCommunityIcons name="map-marker-radius" size={24} color={ACCENT_BLUE} />
                <View style={{ flex: 1 }}>
                   <Text style={styles.mapLocation}>{request.location || 'Reported Location'}</Text>
                </View>
                <TouchableOpacity style={styles.navActionBtn}>
                   <Text style={styles.navActionText}>NAVIGATE HUB</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* MONOLITHIC PRIMARY ACTION (SAME LAYER) */}
          <TouchableOpacity 
             style={styles.monolithicAction} 
             activeOpacity={0.8} 
             onPress={() => navigation.navigate('Events')}
          >
             <Text style={styles.monolithicActionText}>Find Supporting Hubs</Text>
             <MaterialCommunityIcons name="account-group" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={{ height: 100 }} />
       </ProfileSubScreenWrapper>
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
    borderRadius: 35, // Proper Rounded Corners
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    marginBottom: 40,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryBadge: {
    backgroundColor: GHOST_WHITE,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18, // Proper Icon Box Radius
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
    borderRadius: 18,
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
    color: PRIMARY_DARK,
    marginBottom: 25,
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  metaRoll: {
    gap: 18,
  },
  metaHub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 18, // Proper Icon Box Radius
    backgroundColor: GHOST_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '910',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '910',
    color: PRIMARY_DARK,
    marginTop: 2,
  },
  cardDivider: {
    marginVertical: 25,
    backgroundColor: '#F8F9FA',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '910',
    color: PRIMARY_DARK,
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 25,
    fontWeight: '600',
  },
  actionSection: {
    marginBottom: 40,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  highlightHub: {
    flex: 1,
    height: 100,
    backgroundColor: '#F0F9FF',
    borderRadius: 35, // Premium Hub Radius
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '910',
    color: ACCENT_BLUE,
    marginTop: 8,
  },
  donateHub: {
    flex: 1,
    height: 100,
    backgroundColor: '#FFF1F2',
    borderRadius: 35, // Premium Hub Radius
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
  evidenceSection: {
    marginBottom: 40,
  },
  mediaRoll: {
    flexDirection: 'row',
  },
  imageWrapper: {
    marginRight: 15,
  },
  evidenceImage: {
    width: 220,
    height: 150,
    borderRadius: 35, // Proper Hub Radius
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  perimeterSection: {
    marginBottom: 40,
  },
  mapHub: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35, // Proper Hub Radius
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  mapVisual: {
    width: '100%',
    height: 160,
  },
  mapFooter: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mapLocation: {
    fontSize: 14,
    fontWeight: '910',
    color: PRIMARY_DARK,
  },
  navActionBtn: {
    backgroundColor: PRIMARY_DARK,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  navActionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  monolithicAction: {
    backgroundColor: PRIMARY_DARK,
    height: 70,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    gap: 12,
    elevation: 10,
    shadowColor: PRIMARY_DARK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginTop: 10,
  },
  monolithicActionText: {
    color: '#FFFFFF',
    fontSize: 15,
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
