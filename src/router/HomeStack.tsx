import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ConfigModal from '../screens/ConfigModal';

export type PestIdentifyStackParamsList = {
  HomeScreen: undefined;
  ConfigModal: undefined;
};

const HomeStack = createNativeStackNavigator<PestIdentifyStackParamsList>();

const PestIdentifyStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ConfigModal" component={ConfigModal} />
    </HomeStack.Navigator>
  );
};

export default PestIdentifyStack;
