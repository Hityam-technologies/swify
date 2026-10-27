import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/public/splashScreen';
import LoginScreen from '../screens/public/loginScreen';
import RegistrationScreen from '../screens/public/registrationScreen';
import OtpScreen from '../screens/public/otpScreen';
import ProfileScreen from '../screens/private/tabs/profileTab/profileScreen';
import DiscoverScreen from '../screens/private/tabs/homeTab/discoverScreens/discoverScreen';
import DiscoverResScreen from '../screens/private/tabs/homeTab/discoverScreens/discoverResScreen';
import HostelScreen from '../screens/private/tabs/homeTab/detailScreens/hostels/hostelScreen';
import FloorDetailScreen from '../screens/private/tabs/homeTab/detailScreens/hostels/floorDetailScreen';
import RoomDetailScreen from '../screens/private/tabs/homeTab/detailScreens/hostels/roomDetailScreen';
import HostelSummaryScreen from '../screens/private/tabs/homeTab/detailScreens/hostels/hostelSummaryScreen';
import TabNavigator from './tabNavigator';

const Stack = createNativeStackNavigator();

/**
 * AppNavigator
 * Public auth stack + private MainTabs (floating bottom tabs) + Discover Stack.
 */
function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#ffffff' },
        animation: 'slide_from_right',
        animationDuration: 350,
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ animation: 'fade_from_bottom', animationDuration: 400 }}
      />
      <Stack.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="DiscoverRes"
        component={DiscoverResScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Hostel"
        component={HostelScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="FloorDetail"
        component={FloorDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="RoomDetail"
        component={RoomDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="HostelDetail"
        component={RoomDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="HostelSummary"
        component={HostelSummaryScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
