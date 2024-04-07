import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../theme/theme';
import { StyleSheet } from 'react-native';
import TabButton from '../components/TabButton';

export type AppStackParamsList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  SettingScreen: undefined;
};

const stack = createBottomTabNavigator<AppStackParamsList>();

export default function AppStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{

          tabBarButton: ({ onFocus, onPress }) => <TabButton icon={'cloud'} onFocus={onFocus} onPress={onPress} />
        }}
      />
      <stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarButton: ({ onFocus, onPress }) => <TabButton icon={'home'} onFocus={onFocus} onPress={onPress} />
        }}
      />
      <stack.Screen
        name="SettingScreen"
        component={SettingsScreen}
        options={{
          tabBarButton: ({ onFocus, onPress }) => <TabButton icon={'staro'} onFocus={onFocus} onPress={onPress} />
        }}
      />
    </stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: COLORS.primaryLightGreyHex,
    borderTopColor: 'transparent',
  },
  BlurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
