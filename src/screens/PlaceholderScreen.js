import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export const PlaceholderScreen = ({ name, navigation }) => (
  <View style={styles.container}>
    <Text variant="headlineMedium">{name} Screen</Text>
    <Text variant="bodyMedium" style={styles.text}>This is the {name} screen placeholder.</Text>
    {navigation && <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>Go Back</Button>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  }
});
