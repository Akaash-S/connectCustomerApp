import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Avatar, IconButton, useTheme } from 'react-native-paper';

export const EditProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: 'Akash',
    email: 'akash@example.com',
    phone: '+91 9876543210',
    location: 'Chennai, India',
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text variant="titleLarge" style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.avatarSection}>
        <Avatar.Image size={100} source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} />
        <Button mode="text" style={styles.changePicBtn}>Change Photo</Button>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          style={styles.input}
          mode="outlined"
          outlineColor="#E5E7EB"
        />
        <TextInput
          label="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          style={styles.input}
          mode="outlined"
          outlineColor="#E5E7EB"
          keyboardType="email-address"
        />
        <TextInput
          label="Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          style={styles.input}
          mode="outlined"
          outlineColor="#E5E7EB"
          keyboardType="phone-pad"
        />
        <TextInput
          label="Location"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          style={styles.input}
          mode="outlined"
          outlineColor="#E5E7EB"
        />

        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()} 
          style={styles.saveBtn}
          contentStyle={{ paddingVertical: 10 }}
        >
          Save Changes
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  changePicBtn: {
    marginTop: 8,
  },
  form: {
    padding: 20,
    marginTop: 10,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  saveBtn: {
    marginTop: 10,
    borderRadius: 14,
  },
});
