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
import OtherScreen from '../screens/OtherScreen';

export type AppStackParamsList = {
  HomeStack: undefined;
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
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyle}
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
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
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
    bottom: 20,
    marginHorizontal: 20,
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: COLORS.bottomBarColor,
    borderTopColor: 'transparent',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    paddingHorizontal: 20,
  },
  BlurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
