import React from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabButton from '../components/TabButton';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/AntDesign';

import HomeStack from './HomeStack';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingScreen';
import AboutUsScreen from '../screens/AboutUsScreen';

export type AppStackParamsList = {
  HomeStack: undefined;
  HistoryScreen: undefined;
  SettingScreen: undefined;
  AboutUsScreen: undefined;
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
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.blurViewStyle}
          />
        ),
      }}>
      <stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={30}
              color={focused ? COLORS.primaryBlueHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="book"
              size={30}
              color={focused ? COLORS.primaryBlueHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <stack.Screen
        name="SettingScreen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="setting"
              size={30}
              color={focused ? COLORS.primaryBlueHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="bells"
              size={30}
              color={focused ? COLORS.primaryBlueHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
    </stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 60,
    backgroundColor: COLORS.bottomBarColor,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
