import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { 
  HomeScreen, NGOsScreen, EventsScreen, RequestsScreen, ProfileScreen, 
  PlaceholderScreen, RequestHelpScreen, NGODetailsScreen, EventDetailsScreen,
  SplashScreen, LoginScreen, RequestDetailsScreen, ReportDetailsScreen, EditProfileScreen
} from '../screens';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Sub-stacks for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RequestHelp" component={RequestHelpScreen} options={{ title: 'Request Help' }} />
  </Stack.Navigator>
);

const NGOStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="NGOList" component={NGOsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NGODetails" component={NGODetailsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const EventStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="EventList" component={EventsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ReportStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ReportsList" component={RequestsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Notifications" component={PlaceholderScreen} options={{ title: 'Notifications' }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home-variant' : 'home-variant-outline';
          else if (route.name === 'NGOs') iconName = focused ? 'office-building' : 'office-building-outline';
          else if (route.name === 'Events') iconName = focused ? 'calendar-star' : 'calendar-star-outline';
          else if (route.name === 'Reports') iconName = focused ? 'clipboard-text-play' : 'clipboard-text-play-outline';
          else if (route.name === 'Profile') iconName = focused ? 'account-circle' : 'account-circle-outline';
          return <MaterialCommunityIcons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          elevation: 8,
          height: 70,
          paddingBottom: 10,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="NGOs" component={NGOStack} />
      <Tab.Screen name="Events" component={EventStack} />
      <Tab.Screen name="Reports" component={ReportStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
  </Stack.Navigator>
);
