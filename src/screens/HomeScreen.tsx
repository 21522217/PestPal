import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing,
} from 'react-native';

import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {COLORS, SPACING} from '../theme/theme';
import {Icon} from 'react-native-elements';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const colorAnimation = useRef(new Animated.Value(0)).current;
  const textColor = colorAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#ff0000', '#7300c5', '#ff9900'],
  }) as unknown as string;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnimation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [colorAnimation]);

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const {uri} = response.assets[0];
        navigation.navigate('ConfigModal', {imageUri: uri});
      }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.mainBackground, COLORS.mainBackgroundSecond]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}>
        <View style={styles.header}>
          <Animatable.Text
            iterationCount="infinite"
            style={[styles.headerText, {color: textColor}]}>
            P E S T P A L
          </Animatable.Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={openCamera} style={styles.button}>
            <Icon name="camera" size={30} style={styles.icon} />
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera} style={styles.button}>
            <Icon name="camera" size={30} style={styles.icon} />
            <Text>Library</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },
  headerText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.6,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.buttonColor,
  },
  icon: {},
  text: {},
});

export default HomeScreen;
