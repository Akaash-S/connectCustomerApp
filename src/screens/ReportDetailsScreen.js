import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Avatar, Divider, IconButton, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const ReportDetailsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { reportId } = route.params || { reportId: '1' };

  // Mock report data
  const report = {
    title: 'Food Distribution Drive',
    volunteer: 'Rahul Sharma',
    date: '24 March 2026',
    notes: 'Successfully distributed meal packets to 50+ families in the area. The community was very welcoming and the team coordination was excellent.',
    images: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400'
    ],
    status: 'Verified',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text variant="titleLarge" style={styles.headerTitle}>Completion Report</Text>
      </View>

      <Card style={styles.contentCard}>
        <View style={styles.reportHeader}>
          <Avatar.Text size={50} label={report.volunteer.substring(0, 1)} style={{ backgroundColor: theme.colors.primary }} />
          <View style={styles.volunteerInfo}>
            <Text variant="titleMedium" style={styles.volunteerName}>{report.volunteer}</Text>
            <Text variant="bodySmall" style={styles.dateText}>{report.date} • {report.status}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <Text variant="titleLarge" style={styles.reportTitle}>{report.title}</Text>
        <Text variant="bodyMedium" style={styles.notesText}>{report.notes}</Text>

        <Text variant="titleMedium" style={styles.galleryTitle}>Execution Photos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
          {report.images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.reportImage} />
          ))}
        </ScrollView>
        <View style={{ height: 120 }} />
      </Card>
    </ScrollView>
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
    paddingTop: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentCard: {
    margin: 20,
    borderRadius: 32,
    backgroundColor: '#FFF',
    elevation: 4,
    padding: 20,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  volunteerInfo: {
    marginLeft: 15,
  },
  volunteerName: {
    fontWeight: 'bold',
  },
  dateText: {
    color: '#6B7280',
  },
  divider: {
    marginVertical: 15,
  },
  reportTitle: {
    fontWeight: '900',
    color: '#1E4D2B',
    marginBottom: 10,
  },
  notesText: {
    color: '#374151',
    lineHeight: 22,
    marginBottom: 25,
  },
  galleryTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  gallery: {
    flexDirection: 'row',
  },
  reportImage: {
    width: 200,
    height: 150,
    borderRadius: 20,
    marginRight: 15,
  },
});
