import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  HomeScreen, NGOsScreen, EventsScreen, RequestsScreen, ProfileScreen,
  PlaceholderScreen, RequestHelpScreen, NGODetailsScreen, EventDetailsScreen,
  SplashScreen, LoginScreen, RequestDetailsScreen, ReportDetailsScreen, EditProfileScreen
} from '../screens';
import { useTheme, Text } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();

  return (
    <View style={styles.tabBarWrapper}>
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
                style={styles.tabButton}
                activeOpacity={1}
              >
                <View style={styles.iconContainer}>
                  {IconComponent && <IconComponent focused={isFocused} color={isFocused ? '#D97706' : '#1A1C1E'} size={24} />}
                </View>
                <Text style={[
                  styles.tabLabel,
                  { color: isFocused ? '#D97706' : '#6B7280' }
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
    <Stack.Screen name="Notifications" component={PlaceholderScreen} options={{ title: 'Notifications' }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
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
    backgroundColor: '#FFF',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingBottom: 15,
  },
  tabBarContent: {
    flex: 1,
  },
  routesContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 6,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
