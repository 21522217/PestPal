// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList, ImageType } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [imageHistory, setImageHistory] = useState<ImageType[]>([]);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission given');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestCameraPermission();
  }, []);

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri, description: '' };
        const updatedHistory = [...imageHistory, source];
        setImageHistory(updatedHistory);
        navigation.navigate('HistoryScreen', { images: updatedHistory });
      }
    });
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri, description: '' };
        const updatedHistory = [...imageHistory, source];
        setImageHistory(updatedHistory);
        navigation.navigate('HistoryScreen', { images: updatedHistory });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Open Image Library" onPress={openImagePicker} />
      <Button title="Open Camera" onPress={openCamera} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
