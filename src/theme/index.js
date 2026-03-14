import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E4D2B', // Forest Green
    secondary: '#D97706', // Amber Accent
    tertiary: '#FEF3C7', // Soft Yellow/Cream
    background: '#FFF9F0', // Warm Cream Background
    surface: '#FFFFFF',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#1A1C1E',
    outline: '#E5E7EB',
    surfaceVariant: '#F3F4F6',
  },
  roundness: 32, // High roundness for premium feel
};
