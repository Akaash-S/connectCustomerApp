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
  SecurityPrivacyScreens, SupportHelpScreens, LegalScreens, NotificationsScreen
} from '../screens';
import { useTheme, Text } from 'react-native-paper';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 80;
const WAVE_WIDTH = 180; // Total width of the S-curve area
const WAVE_DEPTH = 38;  // Vertical depth of the wave
const TOP_RADIUS = 36;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();

    const center = SCREEN_WIDTH / 2;
    
    // SVG Path for the notched bar
    // M (Move) to start of top left curve
    // Q (Quadratic Bezier) for top left corner
    // L (Line) to start of notch
    // C (Cubic Bezier) for smooth notch transition
    // L to top right corner
    // Q for top right corner
    // L to bottom right, bottom left, and close
    const d = `
      M 0 ${TOP_RADIUS}
      Q 0 0 ${TOP_RADIUS} 0
      L ${center - WAVE_WIDTH / 2} 0
      C ${center - WAVE_WIDTH / 4} 0, ${center - WAVE_WIDTH / 4} ${WAVE_DEPTH}, ${center} ${WAVE_DEPTH}
      C ${center + WAVE_WIDTH / 4} ${WAVE_DEPTH}, ${center + WAVE_WIDTH / 4} 0, ${center + WAVE_WIDTH / 2} 0
      L ${SCREEN_WIDTH - TOP_RADIUS} 0
      Q ${SCREEN_WIDTH} 0 ${SCREEN_WIDTH} ${TOP_RADIUS}
      L ${SCREEN_WIDTH} ${TAB_BAR_HEIGHT + 40}
      L 0 ${TAB_BAR_HEIGHT + 40}
      Z
    `;

    return (
      <View style={styles.tabBarWrapper}>
        {/* SVG Background Layer */}
        <View style={styles.svgBackground}>
          <Svg width={SCREEN_WIDTH} height={TAB_BAR_HEIGHT + 40}>
            <Path
              d={d}
              fill="#FFF"
              stroke="#F3F4F6"
              strokeWidth={0.5}
            />
          </Svg>
        </View>

        <View style={styles.tabBarContent}>
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
  
              const isCenter = route.name === 'Add';
              const IconComponent = options.tabBarIcon;
  
              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  style={[styles.tabButton, isCenter && styles.centerTabButton]}
                  activeOpacity={1}
                >
                  <View style={[
                    styles.iconContainer,
                    isCenter && (isFocused ? styles.highlightIconContainerActive : styles.highlightIconContainerInactive)
                  ]}>
                    {IconComponent && (
                      <IconComponent 
                        focused={isFocused} 
                        color={isCenter ? (isFocused ? '#FFF' : '#1A1C1E') : (isFocused ? '#D97706' : '#1A1C1E')} 
                        size={isCenter ? 32 : 24} 
                      />
                    )}
                  </View>
                  <Text style={[
                    styles.tabLabel,
                    { color: isFocused ? '#D97706' : '#6B7280' },
                    isCenter && isFocused && styles.centerLabelActive
                  ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
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
    <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MyRequests" component={MyRequestsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="JoinedEvents" component={JoinedEventsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SavedItems" component={SavedItemsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Preferences" component={PreferencesScreens} options={{ headerShown: false }} />
    <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacyScreens} options={{ headerShown: false }} />
    <Stack.Screen name="SupportHelp" component={SupportHelpScreens} options={{ headerShown: false }} />
    <Stack.Screen name="Legal" component={LegalScreens} options={{ headerShown: false }} />
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
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBarWrapper: {
    height: 95,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarContent: {
    flex: 1,
  },
  routesContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'baseline',
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  centerTabButton: {
    marginTop: -42, // Adjusted for the shallower wave "valley"
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightIconContainerActive: {
    backgroundColor: '#D97706',
    width: 68,
    height: 68,
    borderRadius: 34,
    elevation: 8,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 5,
    borderColor: '#FFF',
  },
  highlightIconContainerInactive: {
    backgroundColor: '#F3F4F6',
    width: 68,
    height: 68,
    borderRadius: 34,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 5,
    borderColor: '#FFF',
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  centerLabelActive: {
    marginTop: 8,
    color: '#D97706',
    fontWeight: '900',
  },
  shadow: {
    shadowColor: '#1E4D2B',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});
