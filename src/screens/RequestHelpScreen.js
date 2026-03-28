import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Dimensions, Animated, KeyboardAvoidingView, Platform, ScrollView, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button, Text, Divider, SegmentedButtons } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { api } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY_DARK = '#1A1C1E';
const ACCENT_BLUE = '#3B82F6';
const GHOST_WHITE = '#F8F9FA';
const ERROR_RED = '#EF4444';

export const RequestHelpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('health');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [mediaList, setMediaList] = useState([]);

  const CATEGORIES = [
    { id: 'health', title: 'Wellness', icon: 'medical-bag', color: '#EF4444' },
    { id: 'education', title: 'Learning', icon: 'book-open-variant', color: '#3B82F6' },
    { id: 'environment', title: 'Nature', icon: 'tree-outline', color: '#10B981' },
    { id: 'animals', title: 'Animals', icon: 'dog', color: '#F59E0B' },
    { id: 'disaster', title: 'Emergency', icon: 'alert-decagram-outline', color: '#64748B' },
  ];

  const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      urgency: 'medium',
      location: '',
      volunteers: 1,
      date: new Date().toISOString().split('T')[0],
    }
  });

  const formValues = watch();

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setValue('location', 'Chennai, India (Default)');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let reverse = await Location.reverseGeocodeAsync(location.coords);
      if (reverse && reverse.length > 0) {
        const addr = `${reverse[0].street ? reverse[0].street + ', ' : ''}${reverse[0].district || reverse[0].city}`;
        setValue('location', addr);
      }
    } catch (err) {
      console.warn("Location Error:", err);
      setValue('location', 'Chennai, India');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleAddMedia = () => {
    const mockImages = [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400'
    ];
    const newMedia = { id: Date.now().toString(), uri: mockImages[Math.floor(Math.random() * mockImages.length)] };
    setMediaList([...mediaList, newMedia]);
  };

  const handlePublish = async (data) => {
    setIsSubmitting(true);
    try {
      await api.createRequest({
        title: data.title,
        description: data.description,
        category: selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
        type: data.urgency === 'high' ? 'Urgent' : 'Standard',
        location: data.location || "Unspecified",
        volunteersNeeded: data.volunteers,
        eventDate: new Date(data.date).toISOString()
      });
      Alert.alert("Success", "Your community request has been broadcasted.");
      navigation.goBack();
    } catch (err) {
       Alert.alert("Error", "Failed to broadcast request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onValidationFailed = (failedFields) => {
    console.log("Validation Failed:", failedFields);
    Alert.alert("Requirement Missing", "Please verify the core identity and context specifics of your request.");
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : null} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
          keyboardShouldPersistTaps="always"
        >
           {/* MONOLITHIC INTEGRATED HEADER */}
           <View style={[styles.integratedHeader, { paddingTop: insets.top + 20 }]}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                 <MaterialCommunityIcons name="close" size={24} color={PRIMARY_DARK} />
              </TouchableOpacity>
              <View style={styles.headerTitleGroup}>
                 <Text style={styles.headerTitle}>Support Architect</Text>
                 <Text style={styles.headerSub}>Database Integrity System</Text>
              </View>
              <View style={{ width: 44 }} />
           </View>

           {/* IDENTITY SECTION */}
           <View style={styles.hubSection}>
              <Text style={styles.sectionLabel}>The Identity</Text>
              <Text style={styles.sectionTitle}>What is the core requirement?</Text>
              
              <Controller
                control={control}
                rules={{ required: "A clear title is essential.", minLength: { value: 5, message: "Title must be at least 5 characters." } }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      style={styles.heroInput}
                      mode="outlined"
                      outlineColor="#F1F5F9"
                      activeOutlineColor={PRIMARY_DARK}
                      placeholder="Enter a compelling title..."
                      placeholderTextColor="#94A3B8"
                      textColor={PRIMARY_DARK}
                      error={!!errors.title}
                    />
                    {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
                  </View>
                )}
                name="title"
              />

              <View style={styles.categoryRoll}>
                 {CATEGORIES.map(cat => (
                   <TouchableOpacity 
                     key={cat.id} 
                     style={[styles.catChip, selectedCategory === cat.id && styles.activeCatChip]}
                     onPress={() => setSelectedCategory(cat.id)}
                     activeOpacity={0.8}
                   >
                      <View style={[styles.catIconBox, { backgroundColor: cat.color + '10' }]}>
                         <MaterialCommunityIcons name={cat.icon} size={20} color={cat.color} />
                      </View>
                      <Text style={[styles.catChipText, selectedCategory === cat.id && styles.activeCatChipText]}>{cat.title}</Text>
                   </TouchableOpacity>
                 ))}
              </View>
           </View>

           {/* LOGISTICS SECTION */}
           <View style={styles.hubCard}>
              <Text style={styles.cardLabel}>The Logistics</Text>
              
              <View style={styles.inputGroup}>
                 <Text style={styles.fieldLabel}>Detected Location</Text>
                 <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        style={styles.hubInput}
                        mode="outlined"
                        outlineColor="#F1F5F9"
                        activeOutlineColor={PRIMARY_DARK}
                        placeholder="Detecting..."
                        textColor={PRIMARY_DARK}
                        left={<TextInput.Icon icon="map-marker-radius" size={20} color={ACCENT_BLUE} />}
                        right={isDetectingLocation ? <TextInput.Icon icon={() => <ActivityIndicator size="small" color={ACCENT_BLUE} />} /> : null}
                      />
                    )}
                    name="location"
                 />
              </View>

              <View style={styles.gridRow}>
                 <View style={{ flex: 1 }}>
                    <Text style={styles.fieldLabel}>Impact Target</Text>
                    <SegmentedButtons
                       value={formValues.urgency}
                       onValueChange={val => setValue('urgency', val)}
                       buttons={[
                         { value: 'medium', label: 'Standard' },
                         { value: 'high', label: 'Urgent', checkedColor: '#EF4444' },
                       ]}
                       style={styles.segmented}
                    />
                 </View>
              </View>

              <Divider style={styles.cardDivider} />

              <View style={styles.inputGroup}>
                 <Text style={styles.fieldLabel}>Context & Specifics</Text>
                 <Controller
                    control={control}
                    rules={{ required: "Detailed context ensures appropriate response.", minLength: { value: 10, message: "Please provide more specifics (min 10 chars)." } }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          style={[styles.hubInput, styles.textArea]}
                          mode="outlined"
                          outlineColor="#F1F5F9"
                          activeOutlineColor={PRIMARY_DARK}
                          multiline
                          numberOfLines={6}
                          placeholder="Detail the community need here..."
                          textColor={PRIMARY_DARK}
                          error={!!errors.description}
                          textAlignVertical="top"
                        />
                        {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
                      </View>
                    )}
                    name="description"
                 />
              </View>
           </View>

           {/* MEDIA EVIDENCE CENTER */}
           <View style={styles.hubSection}>
              <Text style={styles.sectionLabel}>The Evidence</Text>
              <Text style={styles.sectionTitle}>Contextual Records</Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaRoll}>
                 <TouchableOpacity style={styles.addMediaBtn} onPress={handleAddMedia} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="camera-plus-outline" size={32} color={PRIMARY_DARK} />
                    <Text style={styles.addMediaText}>Add Proof</Text>
                 </TouchableOpacity>
                 {mediaList.map((item) => (
                   <View key={item.id} style={styles.mediaWrapper}>
                      <Image source={{ uri: item.uri }} style={styles.mediaImage} />
                      <TouchableOpacity style={styles.removeMedia} onPress={() => setMediaList(prev => prev.filter(m => m.id !== item.id))}>
                         <MaterialCommunityIcons name="close" size={14} color="#FFF" />
                      </TouchableOpacity>
                   </View>
                 ))}
              </ScrollView>
           </View>

           {/* IMPACT SCALE */}
           <View style={styles.stepperSection}>
              <View style={styles.stepperHeader}>
                 <View>
                    <Text style={styles.sectionLabel}>The Scale</Text>
                    <Text style={styles.stepperTitle}>Community Force</Text>
                 </View>
                 <View style={styles.scaleBadge}>
                    <Text style={styles.scaleNum}>{formValues.volunteers}</Text>
                    <Text style={styles.scaleSub}>UNITS</Text>
                 </View>
              </View>

              <View style={styles.stepperWidget}>
                 <TouchableOpacity style={styles.stepBtn} onPress={() => setValue('volunteers', Math.max(1, formValues.volunteers - 1))}>
                    <MaterialCommunityIcons name="minus" size={24} color={PRIMARY_DARK} />
                 </TouchableOpacity>
                 <View style={styles.stepBar}>
                    <View style={[styles.stepProgress, { width: `${(formValues.volunteers / 50) * 100}%` }]} />
                  </View>
                 <TouchableOpacity style={styles.stepBtn} onPress={() => setValue('volunteers', Math.min(50, formValues.volunteers + 1))}>
                    <MaterialCommunityIcons name="plus" size={24} color={PRIMARY_DARK} />
                 </TouchableOpacity>
              </View>
           </View>

           {/* MONOLITHIC BROADCAST ACTION (SAME LAYER) */}
           <TouchableOpacity 
              style={[styles.broadcastBtn, isSubmitting && { opacity: 0.8 }]} 
              onPress={handleSubmit(handlePublish, onValidationFailed)}
              activeOpacity={0.9}
              disabled={isSubmitting}
           >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                   <Text style={styles.broadcastText}>Initialize Community Broadcast</Text>
                   <View style={styles.broadcastIconBox}>
                      <MaterialCommunityIcons name="broadcast" size={20} color={PRIMARY_DARK} />
                   </View>
                </>
              )}
           </TouchableOpacity>

           <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  integratedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40, // Increased margin for monolithic space
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: GHOST_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerTitleGroup: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '910',
    color: PRIMARY_DARK,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 0, // Reset padding as header is now internal
  },
  hubSection: {
    marginBottom: 40,
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
    fontSize: 26,
    fontWeight: '910',
    color: PRIMARY_DARK,
    letterSpacing: -1,
    marginBottom: 24,
  },
  heroInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28, 
    fontSize: 18,
    fontWeight: '800',
    color: PRIMARY_DARK,
    height: 70,
  },
  errorText: {
    color: ERROR_RED,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
    marginLeft: 12,
  },
  categoryRoll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22, 
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 10,
  },
  activeCatChip: {
    backgroundColor: PRIMARY_DARK,
    borderColor: PRIMARY_DARK,
  },
  catIconBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catChipText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#64748B',
  },
  activeCatChipText: {
    color: '#FFFFFF',
  },
  hubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35, 
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    marginBottom: 40,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '910',
    color: PRIMARY_DARK,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '910',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
    marginLeft: 4,
  },
  hubInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  textArea: {
    height: 160,
  },
  segmented: {
    backgroundColor: GHOST_WHITE,
    borderRadius: 22,
  },
  cardDivider: {
    marginVertical: 24,
    backgroundColor: '#F8F9FA',
  },
  mediaRoll: {
    marginTop: 10,
  },
  addMediaBtn: {
    width: 120,
    height: 120,
    borderRadius: 32,
    backgroundColor: GHOST_WHITE,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addMediaText: {
    fontSize: 12,
    fontWeight: '900',
    color: PRIMARY_DARK,
    marginTop: 8,
  },
  mediaWrapper: {
    position: 'relative',
    marginRight: 15,
  },
  mediaImage: {
    width: 120,
    height: 120,
    borderRadius: 32,
  },
  removeMedia: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  stepperSection: {
    marginBottom: 40,
  },
  stepperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepperTitle: {
    fontSize: 22,
    fontWeight: '910',
    color: PRIMARY_DARK,
    letterSpacing: -0.5,
  },
  scaleBadge: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: GHOST_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  scaleNum: {
    fontSize: 24,
    fontWeight: '1000',
    color: PRIMARY_DARK,
  },
  scaleSub: {
    fontSize: 8,
    fontWeight: '900',
    color: '#94A3B8',
    marginTop: -2,
  },
  stepperWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GHOST_WHITE,
    padding: 10,
    borderRadius: 35,
    gap: 15,
  },
  stepBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  stepBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  stepProgress: {
    height: '100%',
    backgroundColor: PRIMARY_DARK,
  },
  broadcastBtn: {
    backgroundColor: PRIMARY_DARK,
    height: 75,
    borderRadius: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    elevation: 12,
    shadowColor: PRIMARY_DARK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  broadcastText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '910',
    letterSpacing: -0.3,
  },
  broadcastIconBox: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
