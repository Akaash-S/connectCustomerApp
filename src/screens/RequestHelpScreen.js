import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput, Button, Text, useTheme, HelperText, Card, IconButton, Divider } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CATEGORIES = [
  { id: 'grocery', title: 'Groceries', icon: 'basket-outline', color: '#10B981' },
  { id: 'medical', title: 'Medical', icon: 'medical-bag', color: '#EF4444' },
  { id: 'mobility', title: 'Mobility', icon: 'wheelchair-accessibility', color: '#3B82F6' },
  { id: 'general', title: 'General', icon: 'hand-heart-outline', color: '#8B5CF6' },
];

export const RequestHelpScreen = ({ navigation }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [media, setMedia] = useState([]);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      volunteers: '1',
      date: new Date().toISOString().split('T')[0],
    }
  });

  const onSubmit = data => {
    const finalData = { ...data, category: selectedCategory, media };
    console.log('Final Request Data:', finalData);
    navigation.goBack();
  };

  const addPhoto = () => {
    // Mock photo addition
    const mockPhotos = [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400'
    ];
    const newPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
    setMedia([...media, { id: Date.now().toString(), uri: newPhoto }]);
  };

  const removePhoto = (id) => {
    setMedia(media.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header Overlay */}
      <View style={styles.header}>
        <IconButton 
          icon="arrow-left" 
          size={24} 
          onPress={() => navigation.goBack()} 
          containerColor="rgba(255,255,255,0.9)"
          iconColor="#1A1C1E"
        />
        <Text variant="titleLarge" style={styles.headerTitle}>Create Help Request</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Step Indicator (Visual Only) */}
        <View style={styles.stepContainer}>
          <View style={[styles.stepDot, { backgroundColor: theme.colors.primary }]} />
          <View style={styles.stepLine} />
          <View style={styles.stepDot} />
          <View style={styles.stepLine} />
          <View style={styles.stepDot} />
        </View>

        {/* 1. Basic Information */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>1. Basic Information</Text>
          <Card style={styles.formCard}>
            <View style={styles.cardPadding}>
              <Controller
                control={control}
                rules={{ required: 'Short title is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="What do you need help with?"
                    placeholder="e.g. Help with grocery shopping"
                    mode="flat"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.title}
                    style={styles.input}
                    activeUnderlineColor={theme.colors.primary}
                    left={<TextInput.Icon icon="lead-pencil" color={theme.colors.primary} />}
                  />
                )}
                name="title"
              />
              {errors.title && <HelperText type="error">{errors.title.message}</HelperText>}

              <Divider style={styles.inputDivider} />

              <Controller
                control={control}
                rules={{ required: 'Details are important' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Details & Special Instructions"
                    placeholder="Provide context for our volunteers..."
                    mode="flat"
                    multiline
                    numberOfLines={4}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.description}
                    style={[styles.input, { minHeight: 120 }]}
                    activeUnderlineColor={theme.colors.primary}
                  />
                )}
                name="description"
              />
              {errors.description && <HelperText type="error">{errors.description.message}</HelperText>}
            </View>
          </Card>
        </View>

        {/* 2. Help Category */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>2. Select Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryBtn,
                  selectedCategory === cat.id && { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary + '10' }
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '15' }]}>
                  <MaterialCommunityIcons name={cat.icon} size={24} color={cat.color} />
                </View>
                <Text style={[styles.categoryLabel, selectedCategory === cat.id && { color: theme.colors.primary }]}>{cat.title}</Text>
                {selectedCategory === cat.id && (
                  <MaterialCommunityIcons name="check-circle" size={16} color={theme.colors.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. Location & Timing */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>3. Location & Schedule</Text>
          <Card style={styles.formCard}>
            <View style={styles.cardPadding}>
              <Controller
                control={control}
                rules={{ required: 'Location is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Where should volunteers go?"
                    mode="flat"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    activeUnderlineColor={theme.colors.primary}
                    left={<TextInput.Icon icon="map-marker-outline" color={theme.colors.primary} />}
                    right={<TextInput.Icon icon="crosshairs-gps" color="#9CA3AF" />}
                  />
                )}
                name="location"
              />
              
              <Divider style={styles.inputDivider} />

              <View style={styles.row}>
                <View flex={1}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label="Date Needed"
                        mode="flat"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        activeUnderlineColor={theme.colors.primary}
                        left={<TextInput.Icon icon="calendar-outline" color={theme.colors.primary} />}
                      />
                    )}
                    name="date"
                  />
                </View>
                <View style={styles.verticalDivider} />
                <View flex={1}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label="Volunteers"
                        mode="flat"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="numeric"
                        style={styles.input}
                        activeUnderlineColor={theme.colors.primary}
                        left={<TextInput.Icon icon="account-group-outline" color={theme.colors.primary} />}
                      />
                    )}
                    name="volunteers"
                  />
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* 4. Media Evidence */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text variant="titleMedium" style={styles.sectionTitle}>4. Media Evidence</Text>
            <Text style={styles.optionalText}>(Optional)</Text>
          </View>
          <Card style={styles.mediaCard}>
            <View style={styles.mediaPadding}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[{ id: 'add-btn' }, ...media]}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  if (item.id === 'add-btn') {
                    return (
                      <TouchableOpacity style={styles.addMediaBtn} onPress={addPhoto}>
                        <MaterialCommunityIcons name="camera-plus-outline" size={32} color={theme.colors.primary} />
                        <Text style={[styles.addMediaText, { color: theme.colors.primary }]}>Add Photo</Text>
                      </TouchableOpacity>
                    );
                  }
                  return (
                    <View style={styles.photoContainer}>
                      <Image source={{ uri: item.uri }} style={styles.photo} />
                      <TouchableOpacity 
                        style={styles.removePhotoBtn} 
                        onPress={() => removePhoto(item.id)}
                      >
                        <MaterialCommunityIcons name="close-circle" size={24} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
              <Text variant="bodySmall" style={styles.mediaHint}>
                Attach photos of the situation to help volunteers better prepare.
              </Text>
            </View>
          </Card>
        </View>

        <Button 
          mode="contained" 
          onPress={handleSubmit(onSubmit)} 
          style={styles.submitBtn}
          contentStyle={styles.submitBtnContent}
          labelStyle={styles.submitBtnLabel}
          icon="check-decagram"
        >
          Publish Help Request
        </Button>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  headerTitle: {
    fontWeight: '900',
    color: '#1A1C1E',
  },
  scrollContent: {
    paddingTop: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  stepLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 10,
    borderRadius: 2,
  },
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontWeight: '900',
    marginBottom: 12,
    color: '#1A1C1E',
    fontSize: 18,
  },
  formCard: {
    borderRadius: 28,
    backgroundColor: '#FFF',
    elevation: 3,
    shadowColor: '#1E4D2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  cardPadding: {
    padding: 20,
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingHorizontal: 0,
  },
  inputDivider: {
    marginVertical: 15,
    backgroundColor: '#F3F4F6',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryBtn: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    position: 'relative',
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontWeight: '800',
    color: '#4B5563',
    fontSize: 13,
  },
  checkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 15,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  optionalText: {
    color: '#9CA3AF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mediaCard: {
    borderRadius: 28,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  mediaPadding: {
    padding: 16,
  },
  addMediaBtn: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    borderWidth: 2,
    borderColor: 'rgba(30, 77, 43, 0.1)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addMediaText: {
    fontSize: 10,
    fontWeight: '900',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removePhotoBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  mediaHint: {
    color: '#9CA3AF',
    marginTop: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  submitBtn: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 24,
    backgroundColor: '#1E4D2B',
    elevation: 8,
    shadowColor: '#1E4D2B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  submitBtnContent: {
    height: 64,
  },
  submitBtnLabel: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
