import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingScreen';
import OtherScreen from '../screens/OtherScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../theme/theme';
import {StyleSheet} from 'react-native';
import TabButton from '../components/TabButton';

export type AppStackParamsList = {
  HomeScreen: undefined;
  HistoryScreen: undefined;
  SettingScreen: undefined;
  OtherScreen: undefined;
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
          tabBarButton: ({onFocus, onPress}) => (
            <TabButton icon={'cloud'} onFocus={onFocus} onPress={onPress} />
          ),
        }}
      />
      <stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarButton: ({onFocus, onPress}) => (
            <TabButton icon={'home'} onFocus={onFocus} onPress={onPress} />
          ),
        }}
      />
      <stack.Screen
        name="SettingScreen"
        component={SettingsScreen}
        options={{
          tabBarButton: ({onFocus, onPress}) => (
            <TabButton icon={'staro'} onFocus={onFocus} onPress={onPress} />
          ),
        }}
      />
      <stack.Screen
        name="OtherScreen"
        component={OtherScreen}
        options={{
          tabBarButton: ({onFocus, onPress}) => (
            <TabButton icon={'car'} onFocus={onFocus} onPress={onPress} />
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
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: COLORS.bottomBarColor,
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
