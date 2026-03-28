import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Dimensions, Animated, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, IconButton, RadioButton, ProgressBar, HelperText, Divider, SegmentedButtons } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#D97706'; 

const CATEGORIES = [
  { id: 'environment', title: 'Environment', icon: 'tree-outline', color: '#10B981' },
  { id: 'education', title: 'Education', icon: 'book-open-variant', color: '#3B82F6' },
  { id: 'health', title: 'Health', icon: 'medical-bag', color: '#EF4444' },
  { id: 'animals', title: 'Animal Welfare', icon: 'dog', color: '#F59E0B' },
  { id: 'disaster', title: 'Disaster Relief', icon: 'alert-decagram-outline', color: '#6B7280' },
];

const SKILLS = ['First Aid', 'Teaching', 'Cleanup', 'Cooking', 'Driving'];

export const RequestHelpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('environment');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [media, setMedia] = useState([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Added logic to handle potential bottom tab bar height if not provided by insets
  const bottomClearance = Math.max(insets.bottom, 20) + 80;

  const { control, watch, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      urgency: 'medium',
      location: '',
      duration: '2-4 hours',
      volunteers: 1,
      equipment: 'none',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      contactMethod: 'in-app',
      language: 'English',
      notes: '',
    }
  });

  const formValues = watch();

  const transitionTo = (step) => {
    // Instant step change to avoid skeleton UI, followed by a quick fade-in
    fadeAnim.setValue(0);
    setCurrentStep(step);
    Animated.timing(fadeAnim, { 
      toValue: 1, 
      duration: 250, 
      useNativeDriver: true 
    }).start();
  };

  const nextStep = () => {
    if (currentStep < 6) transitionTo(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) transitionTo(currentStep - 1);
    else navigation.goBack();
  };

  const handleFinalSubmit = () => {
    const finalData = { ...formValues, category: selectedCategory, skills: selectedSkills, media };
    console.log('Final Submission:', finalData);
    navigation.goBack();
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const addPhoto = () => {
    const mockPhotos = ['https://tinyurl.com/2s44p8nx', 'https://tinyurl.com/3skk96b3'];
    setMedia([...media, { id: Date.now().toString(), uri: mockPhotos[Math.floor(Math.random() * mockPhotos.length)] }]);
  };

  const MeshBackground = () => (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFFFFF' }]}>
      <View style={[styles.blob, { top: -200, left: -100, backgroundColor: 'rgba(217, 119, 6, 0.2)', width: 600, height: 600 }]} />
      <View style={[styles.blob, { bottom: -100, right: -150, backgroundColor: 'rgba(16, 185, 129, 0.15)', width: 700, height: 700 }]} />
      <View style={[styles.blob, { top: SCREEN_HEIGHT * 0.3, right: -100, backgroundColor: 'rgba(59, 130, 246, 0.1)', width: 400, height: 400 }]} />
    </View>
  );

  const GlassCard = ({ title, subtitle, children, onAction, actionLabel }) => (
    <View style={styles.glassContainer}>
      <View style={styles.glassCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={styles.cardScroll}
          contentContainerStyle={styles.cardContent}
        >
          {children}
        </ScrollView>

        <View style={styles.cardFooter}>
          <Button 
            mode="contained" 
            onPress={onAction} 
            style={styles.actionBtn} 
            contentStyle={styles.actionBtnContent}
            activeOpacity={1}
          >
            {actionLabel}
          </Button>
        </View>
      </View>
    </View>
  );

  const Step1Overview = () => (
    <GlassCard 
      title="1. Overview" 
      subtitle="High priority or standard?"
      actionLabel="Continue"
      onAction={nextStep}
    >
      <Controller
        control={control}
        rules={{ required: 'Title is required', maxLength: 60 }}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput label="Title" mode="outlined" onChangeText={onChange} value={value} style={styles.glassInput} outlineColor="rgba(0,0,0,0.1)" />
            <HelperText type="info" style={styles.charCount}>{value.length}/60</HelperText>
          </View>
        )}
        name="title"
      />
      <Text style={styles.fieldLabel}>Urgency Level</Text>
      <SegmentedButtons
        value={formValues.urgency}
        onValueChange={val => setValue('urgency', val)}
        theme={{ colors: { secondaryContainer: PRIMARY_COLOR + '20' }}}
        buttons={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High', checkedColor: '#EF4444' },
        ]}
        style={styles.segmented}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={{ marginTop: 10 }}>
            <TextInput label="Description" mode="outlined" multiline style={[styles.glassInput, { height: 100 }]} onChangeText={onChange} value={value} outlineColor="rgba(0,0,0,0.1)" />
            <HelperText type="info" style={styles.charCount}>{value.length}/500</HelperText>
          </View>
        )}
        name="description"
      />
    </GlassCard>
  );

  const Step2Category = () => (
    <GlassCard 
      title="2. Category" 
      subtitle="Select the type of help"
      actionLabel="Continue"
      onAction={nextStep}
    >
      <View style={styles.pillContainer}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity 
            key={cat.id} 
            activeOpacity={1}
            style={[styles.glassPill, selectedCategory === cat.id && { backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <MaterialCommunityIcons name={cat.icon} size={20} color={selectedCategory === cat.id ? '#FFF' : cat.color} />
            <Text style={[styles.pillLabel, selectedCategory === cat.id && { color: '#FFF' }]}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GlassCard>
  );

  const Step3Logistics = () => (
    <GlassCard 
      title="3. Logistics" 
      subtitle="Detailed Schedule"
      actionLabel="Continue"
      onAction={nextStep}
    >
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput 
            label="Location" mode="outlined" onChangeText={onChange} value={value} style={styles.glassInput}
            left={<TextInput.Icon icon="map-marker" />}
            right={<TextInput.Icon icon="crosshairs-gps" onPress={() => setValue('location', 'Current Location')} />}
          />
        )}
        name="location"
      />
      <View style={styles.row}>
        <View flex={1}>
          <Controller control={control} render={({ field: { onChange, value } }) => (<TextInput label="Date" mode="outlined" value={value} onChangeText={onChange} style={styles.glassInput} />)} name="date" />
        </View>
        <View flex={1}>
          <Controller control={control} render={({ field: { onChange, value } }) => (<TextInput label="Time" mode="outlined" value={value} onChangeText={onChange} style={styles.glassInput} />)} name="time" />
        </View>
      </View>
      <Text style={styles.fieldLabel}>Est. Duration</Text>
      <SegmentedButtons
        value={formValues.duration}
        onValueChange={val => setValue('duration', val)}
        theme={{ colors: { secondaryContainer: PRIMARY_COLOR + '20' }}}
        buttons={[
          { value: '1-2h', label: '< 2h' },
          { value: '2-4h', label: '2-4h' },
          { value: 'all-day', label: 'Full Day' },
        ]}
        style={styles.segmented}
      />
    </GlassCard>
  );

  const Step4Volunteers = () => (
    <GlassCard 
      title="4. Volunteers" 
      subtitle="Skills and Gear"
      actionLabel="Continue"
      onAction={nextStep}
    >
      <View style={styles.stepperRow}>
        <Text style={styles.stepperLabel}>👥 Needed</Text>
        <View style={styles.stepperActions}>
          <IconButton icon="minus" size={24} mode="contained" containerColor="rgba(0,0,0,0.05)" onPress={() => setValue('volunteers', Math.max(1, formValues.volunteers - 1))} />
          <Text style={styles.stepperValue}>{formValues.volunteers}</Text>
          <IconButton icon="plus" size={24} mode="contained" containerColor="rgba(0,0,0,0.05)" onPress={() => setValue('volunteers', Math.min(50, formValues.volunteers + 1))} />
        </View>
      </View>
      <Divider style={{ marginVertical: 15 }} />
      <Text style={styles.fieldLabel}>Equipment Profile</Text>
      <RadioButton.Group onValueChange={val => setValue('equipment', val)} value={formValues.equipment}>
        <View style={styles.row}>
          <View style={styles.radioBlock}><RadioButton value="none" color={PRIMARY_COLOR} /><Text>None</Text></View>
          <View style={styles.radioBlock}><RadioButton value="provided" color={PRIMARY_COLOR} /><Text>Provided</Text></View>
          <View style={styles.radioBlock}><RadioButton value="bring" color={PRIMARY_COLOR} /><Text>Bring</Text></View>
        </View>
      </RadioButton.Group>
      <Divider style={{ marginVertical: 15 }} />
      <Text style={styles.fieldLabel}>Required Skills</Text>
      <View style={styles.pillContainer}>
        {SKILLS.map(skill => (
          <TouchableOpacity 
            key={skill} 
            activeOpacity={1}
            style={[styles.smallPill, selectedSkills.includes(skill) && { backgroundColor: '#1A1C1E', borderColor: '#1A1C1E' }]}
            onPress={() => toggleSkill(skill)}
          >
            <Text style={[styles.smallPillLabel, selectedSkills.includes(skill) && { color: '#FFF' }]}>{skill}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GlassCard>
  );

  const Step5Details = () => (
    <GlassCard 
      title="5. Details" 
      subtitle="Final specifics"
      actionLabel="Preview Request"
      onAction={nextStep}
    >
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Preferred Language" mode="outlined" onChangeText={onChange} value={value} style={styles.glassInput} left={<TextInput.Icon icon="translate" />} />
        )}
        name="language"
      />
      <Text style={styles.fieldLabel}>Contact Method</Text>
      <RadioButton.Group onValueChange={val => setValue('contactMethod', val)} value={formValues.contactMethod}>
        <View style={styles.row}>
          <View style={styles.radioBlock}><RadioButton value="in-app" color={PRIMARY_COLOR} /><Text>In-App</Text></View>
          <View style={styles.radioBlock}><RadioButton value="phone" color={PRIMARY_COLOR} /><Text>Call</Text></View>
          <View style={styles.radioBlock}><RadioButton value="email" color={PRIMARY_COLOR} /><Text>Email</Text></View>
        </View>
      </RadioButton.Group>
      <Divider style={{ marginVertical: 15 }} />
      <View style={{ height: 100 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'add' }, ...media]}
          renderItem={({ item }) => item.id === 'add' ? (
            <TouchableOpacity style={styles.addPhotoGlass} onPress={addPhoto} activeOpacity={1}>
              <MaterialCommunityIcons name="camera-plus" size={28} color={PRIMARY_COLOR} />
            </TouchableOpacity>
          ) : (
            <Image source={{ uri: item.uri }} style={styles.mediaFrame} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </GlassCard>
  );

  const Step6Preview = () => (
    <GlassCard 
      title="Broadcast" 
      subtitle="Verify your request"
      actionLabel="Blast Request"
      onAction={handleFinalSubmit}
    >
        <View style={[styles.urgencyBadge, { backgroundColor: formValues.urgency === 'high' ? '#EF4444' : PRIMARY_COLOR }]}>
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 10, textTransform: 'uppercase' }}>{formValues.urgency} Urgency</Text>
        </View>
        <Text style={styles.previewTitle}>{formValues.title}</Text>
        <Text style={styles.previewDesc}>{formValues.description}</Text>
        <Divider style={{ marginVertical: 15 }} />
        
        <View style={styles.metaGrid}>
          <View style={styles.metaRow}><MaterialCommunityIcons name="map-marker" size={16} /><Text style={styles.metaText}>{formValues.location}</Text></View>
          <View style={styles.metaRow}><MaterialCommunityIcons name="clock-outline" size={16} /><Text style={styles.metaText}>{formValues.duration}</Text></View>
          <View style={styles.metaRow}><MaterialCommunityIcons name="calendar-lock" size={16} /><Text style={styles.metaText}>{formValues.date} @ {formValues.time}</Text></View>
          <View style={styles.metaRow}><MaterialCommunityIcons name="account-group" size={16} /><Text style={styles.metaText}>{formValues.volunteers} Volunteers ({formValues.equipment})</Text></View>
          <View style={styles.metaRow}><MaterialCommunityIcons name="translate" size={16} /><Text style={styles.metaText}>{formValues.language}</Text></View>
        </View>
        
        {selectedSkills.length > 0 && (
          <Text style={styles.previewSubtext}>Required Skills: {selectedSkills.join(', ')}</Text>
        )}
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      <MeshBackground />
      
      {/* Header with Progress Bar */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <View style={styles.headerTop}>
          <IconButton icon="arrow-left" onPress={prevStep} />
          <Text style={styles.headerText}>Create Help Request</Text>
          <View width={48} />
        </View>
        <ProgressBar progress={currentStep / 6} color={PRIMARY_COLOR} style={styles.progressBar} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Animated.View style={[styles.main, { opacity: fadeAnim }]}>
          {currentStep === 1 && <Step1Overview />}
          {currentStep === 2 && <Step2Category />}
          {currentStep === 3 && <Step3Logistics />}
          {currentStep === 4 && <Step4Volunteers />}
          {currentStep === 5 && <Step5Details />}
          {currentStep === 6 && <Step6Preview />}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  blob: { position: 'absolute', borderRadius: 200, opacity: 0.6 },
  header: { paddingHorizontal: 10, zIndex: 10 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerText: { fontSize: 18, fontWeight: '900', color: '#1A1C1E', letterSpacing: -0.5 },
  progressBar: { height: 4, borderRadius: 2, marginHorizontal: 20, marginTop: 5 },
  main: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glassContainer: { width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.65, alignItems: 'center' },
  glassCard: { 
    width: '100%', height: '100%', borderRadius: 36, padding: 24, 
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F1F5F9', overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 25 }, shadowOpacity: 0.12, shadowRadius: 40, elevation: 12 
  },
  cardHeader: { marginBottom: 15 },
  cardTitle: { fontSize: 26, fontWeight: '900', color: '#1A1C1E' },
  cardSubtitle: { fontSize: 13, fontWeight: '800', color: '#6B7280', textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 },
  cardScroll: { flex: 1, width: '100%' },
  cardContent: { paddingBottom: 20 },
  cardFooter: { marginTop: 15, width: '100%' },
  fieldLabel: { fontSize: 11, fontWeight: '900', color: '#6B7280', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 1 },
  glassInput: { backgroundColor: '#F8FAFC', marginBottom: 5 },
  segmented: { marginBottom: 15 },
  charCount: { alignSelf: 'flex-end', fontSize: 10, color: '#6B7280', fontWeight: '600' },
  pillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  glassPill: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 24, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  pillLabel: { marginLeft: 8, fontWeight: '900', color: '#4B5563', fontSize: 14 },
  row: { flexDirection: 'row', gap: 12 },
  stepperRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepperLabel: { fontSize: 16, fontWeight: '900', color: '#1A1C1E' },
  stepperActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepperValue: { fontSize: 22, fontWeight: '900', color: PRIMARY_COLOR },
  smallPill: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  smallPillLabel: { fontSize: 13, fontWeight: '800', color: '#4B5563' },
  addPhotoGlass: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#F8FAFC', borderStyle: 'dashed', borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  mediaFrame: { width: 80, height: 80, borderRadius: 24, marginRight: 15 },
  radioBlock: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  previewTitle: { fontSize: 26, fontWeight: '900', color: '#1A1C1E' },
  previewDesc: { fontSize: 14, color: '#4B5563', marginTop: 8, lineHeight: 20 },
  urgencyBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 10 },
  metaGrid: { gap: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaText: { marginLeft: 10, fontSize: 14, fontWeight: '700', color: '#1F2937' },
  previewSubtext: { marginTop: 15, fontSize: 12, color: '#6B7280', fontStyle: 'italic' },
  actionBtn: { borderRadius: 28, backgroundColor: PRIMARY_COLOR, elevation: 12, shadowColor: PRIMARY_COLOR, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 12 },
  actionBtnContent: { height: 60 }
});
