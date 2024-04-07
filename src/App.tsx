// // App.tsx
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Provider as PaperProvider } from 'react-native-paper';
// import HomeScreen from './screens/HomeScreen';
// import SettingsScreen from './screens/SettingScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

// const Tab = createBottomTabNavigator();

// const Stack = createSharedElementStackNavigator();

// export default function App() {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Tab.Navigator>
//           <Tab.Screen name="Home">
//             {() => (
//               <Stack.Navigator>
//                 <Stack.Screen
//                   name="Home"
//                   component={HomeScreen}
//                   options={{ headerShown: false }}
//                 />
//               </Stack.Navigator>
//             )}
//           </Tab.Screen>
//           <Tab.Screen name="Settings" component={SettingsScreen} />
//           <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

import React from 'react';

import Router from './router/Router';

export default function App() {
  return <Router />;
}
