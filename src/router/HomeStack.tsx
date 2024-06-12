import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ConfigModal from '../screens/ConfigModal';

export type PestIdentifyStackParamsList = {
  HomeScreen: undefined;
  ConfigModal: {imageUri: string | undefined};
};

const HomeStack = createNativeStackNavigator<PestIdentifyStackParamsList>();

const PestIdentifyStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="ConfigModal"
        component={ConfigModal}
        options={{presentation: 'modal'}}
      />
    </HomeStack.Navigator>
  );
};

export default PestIdentifyStack;
