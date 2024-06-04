import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppStackParamList, ImageType} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

import {COLORS, SCALES} from '../theme/theme';

type HomeScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'HomeScreen'
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [imageHistory, setImageHistory] = useState<ImageType[]>([]);
  const [label, setLabel] = useState<string | null>(null);

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

  const handleImageResponse = async (uri: string | undefined) => {
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(
        'http://localhost:8000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setLabel(response.data.predicted_class);
      Alert.alert('Label', `The label is: ${response.data.predicted_class}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = {uri: response.assets[0].uri, description: ''};
        const updatedHistory = [...imageHistory, source];
        setImageHistory(updatedHistory);
        navigation.navigate('HistoryScreen', {images: updatedHistory});
        handleImageResponse(response.assets[0].uri);
      }
    });
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = {uri: response.assets[0].uri, description: ''};
        const updatedHistory = [...imageHistory, source];
        setImageHistory(updatedHistory);
        navigation.navigate('HistoryScreen', {images: updatedHistory});
        handleImageResponse(response.assets[0].uri);
      }
    });
  };

  return (
    <ImageBackground
      source={require('../assets/appBG.png')}
      style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require('../assets/pestpalWelcome.png')}
          style={styles.bannerImage}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={openImagePicker}>
          <View
            style={{
              display: 'flex',
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../assets/Vector.png')} />
          </View>
          <View
            style={{
              display: 'flex',
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.buttonText}>Library</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <View
            style={{
              display: 'flex',
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../assets/Camera.png')} />
          </View>
          <View
            style={{
              display: 'flex',
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.buttonText}>Camera</Text>
          </View>
        </TouchableOpacity>
        {/* {label && <Text style={styles.label}>Label: {label}</Text>}
        {imageHistory.length > 0 && (
          <Image
            source={{uri: imageHistory[imageHistory.length - 1].uri}}
            style={styles.image}
          />
        )} */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  banner: {
    display: 'flex',
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
  },
  buttons: {
    display: 'flex',
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    backgroundColor: COLORS.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  label: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default HomeScreen;
