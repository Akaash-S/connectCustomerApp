import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Button, Text, useTheme, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

export const RequestHelpScreen = ({ navigation }) => {
  const theme = useTheme();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      location: '',
      volunteers: '',
      date: '',
    }
  });

  const onSubmit = data => {
    console.log(data);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.title}>Submit a Request</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Provide details about the help you need, and our community volunteers will reach out.
      </Text>

      <Controller
        control={control}
        rules={{ required: 'Title is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Request Title"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.title}
            style={styles.input}
          />
        )}
        name="title"
      />
      {errors.title && <HelperText type="error">{errors.title.message}</HelperText>}

      <Controller
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Description"
            mode="outlined"
            multiline
            numberOfLines={4}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.description}
            style={styles.input}
          />
        )}
        name="description"
      />
      {errors.description && <HelperText type="error">{errors.description.message}</HelperText>}

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Category"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="category"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Volunteers Needed"
                mode="outlined"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="volunteers"
          />
        </View>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Location"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="location"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Date Needed"
            mode="outlined"
            placeholder="YYYY-MM-DD"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="date"
      />

      <Button 
        mode="contained" 
        onPress={handleSubmit(onSubmit)} 
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Submit Request
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#666',
    marginBottom: 25,
  },
  input: {
    marginBottom: 5,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
  buttonContent: {
    height: 48,
  }
});
