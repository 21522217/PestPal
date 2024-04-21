// HomeScreen.tsx
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, Alert} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

const HomeScreen = () => {
  useEffect(() => {
    // Mount component - only me know this becoz I'm pro player react native
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
      mediaType: 'photo' as MediaType, // Specify the media type as 'photo' or 'video' depending on your requirement
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // Access the URI from the first asset
        const source = {uri: response.assets[0].uri};
        // Do something with the selected image
        Alert.alert('Image Selected!', 'Do something with the image', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    });
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType, // Specify the media type as 'photo' or 'video' depending on your requirement
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // Access the URI from the first asset
        const source = {uri: response.assets[0].uri};
        // Do something with the taken photo
        Alert.alert('Photo Taken!', 'Do something with the photo', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    });
  };

  return (
    <View>
      <Button title="Open Image Library" onPress={openImagePicker} />
      <Button title="Open Camera" onPress={openCamera} />
    </View>
  );
};

export default HomeScreen;
