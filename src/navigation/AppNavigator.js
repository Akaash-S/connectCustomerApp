import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  HomeScreen, NGOsScreen, EventsScreen, RequestsScreen, ProfileScreen,
  PlaceholderScreen, RequestHelpScreen, NGODetailsScreen, EventDetailsScreen,
  SplashScreen, LoginScreen, RequestDetailsScreen, ReportDetailsScreen, EditProfileScreen,
  MyRequestsScreen, JoinedEventsScreen, SavedItemsScreen, PreferencesScreens,
  SecurityPrivacyScreens, SupportHelpScreens, LegalScreens, NotificationsScreen,
  VolunteerApplicationScreen
} from '../screens';
import { useTheme, Text } from 'react-native-paper';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 85;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();

  return (
    <View style={styles.tabBarContainer}>
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
              activeOpacity={1}
            >
              <View style={styles.iconWrapper}>
                {IconComponent && (
                  <IconComponent 
                    focused={isFocused} 
                    color={isFocused ? '#1A1C1E' : '#94A3B8'} 
                    size={24} 
                  />
                )}
                {isFocused && <View style={styles.activeLine} />}
              </View>
              <Text style={[
                styles.tabLabel,
                { color: isFocused ? '#1A1C1E' : '#94A3B8' }
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Sub-stacks for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RequestHelp" component={RequestHelpScreen} options={{ title: 'Request Help' }} />
    <Stack.Screen name="Events" component={EventsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const NGOStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="NGOList" component={NGOsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NGODetails" component={NGODetailsScreen} options={{ headerShown: false }} />
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
    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MyRequests" component={MyRequestsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="JoinedEvents" component={JoinedEventsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SavedItems" component={SavedItemsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Preferences" component={PreferencesScreens} options={{ headerShown: false }} />
    <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacyScreens} options={{ headerShown: false }} />
    <Stack.Screen name="SupportHelp" component={SupportHelpScreens} options={{ headerShown: false }} />
    <Stack.Screen name="Legal" component={LegalScreens} options={{ headerShown: false }} />
    <Stack.Screen name="VolunteerApplication" component={VolunteerApplicationScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="palette-outline" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="NGOs"
        component={NGOStack}
        options={{
          title: 'NGOs',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="office-building-outline" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Add"
        component={RequestHelpScreen}
        options={{
          title: 'Request',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle-outline" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportStack}
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-box-outline" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" size={size} color={color} />
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
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBarContainer: {
    height: TAB_BAR_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 25,
    paddingTop: 10,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  routesContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeLine: {
    height: 2,
    width: 12,
    backgroundColor: '#1A1C1E',
    borderRadius: 1,
    marginTop: 4,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
