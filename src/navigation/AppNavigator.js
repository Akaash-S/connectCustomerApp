import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  HomeScreen, NGOsScreen, EventsScreen, RequestsScreen, ProfileScreen,
  PlaceholderScreen, RequestHelpScreen, NGODetailsScreen, EventDetailsScreen,
  SplashScreen, LoginScreen, RequestDetailsScreen, ReportDetailsScreen, EditProfileScreen,
  MyRequestsScreen, JoinedEventsScreen, SavedItemsScreen, PreferencesScreens,
  SecurityPrivacyScreens, SupportHelpScreens, LegalScreens, NotificationsScreen,
  VolunteerApplicationScreen, ImpactLogsScreen
} from '../screens';
import { useTheme, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY_DARK = '#1A1C1E';
const ACCENT_BLUE = '#3B82F6';
const GHOST_WHITE = '#F8F9FA';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  // High-fidelity dynamic height for prominent icons
  const dynamicHeight = 85 + (insets.bottom > 20 ? insets.bottom - 5 : insets.bottom + 10);

  return (
    <View style={[styles.tabBarContainer, { height: dynamicHeight, paddingBottom: insets.bottom + 12 }]}>
      <View style={styles.routesContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : (options.title !== undefined ? options.title : route.name);

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const IconComponent = options.tabBarIcon;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <View style={[styles.iconWrapper, isFocused && styles.activeIconWrapper]}>
                {IconComponent && (
                  <IconComponent
                    focused={isFocused}
                    color={isFocused ? '#FFFFFF' : '#94A3B8'}
                    size={26}
                  />
                )}
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.tabLabel,
                  { color: isFocused ? PRIMARY_DARK : '#94A3B8', fontWeight: isFocused ? '1000' : '900' }
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Sub-stacks are no longer needed as all detail screens are in the root stack
// This ensures 100% resolution for global navigation calls from any hub

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Hub',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-variant" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="NGOs"
        component={NGOsScreen}
        options={{
          title: 'NGOs',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hand-heart" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Add"
        component={RequestHelpScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-thick" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Support"
        component={RequestsScreen}
        options={{
          title: 'Support',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shield-check" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Me',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
    {/* Global Detail Screens - Accessible from any tab */}
    <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
    <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
    <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    <Stack.Screen name="Events" component={EventsScreen} />
    <Stack.Screen name="NGODetails" component={NGODetailsScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />

    {/* Global Sub-Screens - Optimized for Monolithic Access */}
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="MyRequests" component={MyRequestsScreen} />
    <Stack.Screen name="JoinedEvents" component={JoinedEventsScreen} />
    <Stack.Screen name="SavedItems" component={SavedItemsScreen} />
    <Stack.Screen name="Preferences" component={PreferencesScreens} />
    <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacyScreens} />
    <Stack.Screen name="SupportHelp" component={SupportHelpScreens} />
    <Stack.Screen name="Legal" component={LegalScreens} />
    <Stack.Screen name="VolunteerApplication" component={VolunteerApplicationScreen} />
    <Stack.Screen name="ImpactLogs" component={ImpactLogsScreen} />

  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
    elevation: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
  },
  routesContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 65,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: 'transparent',
  },
  activeIconWrapper: {
    backgroundColor: PRIMARY_DARK,
    elevation: 12,
    shadowColor: PRIMARY_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    width: '100%',
  }
});
