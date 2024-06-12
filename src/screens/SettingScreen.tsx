import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '../theme/theme';

const { width } = Dimensions.get('window');

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/profile-icon.png')} style={styles.profileIcon} />
      <Text style={styles.name}>Yoku Pham</Text>
      <Text style={styles.info}>info</Text>
      <Text style={styles.info}>info</Text>
      <Text style={styles.info}>info</Text>
      <TouchableOpacity style={styles.settingsButton}>
        <Image source={require('../assets/settings-icon.png')} style={styles.settingsIcon} />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#c299f2',
  },
  profileIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 50,
    backgroundColor: COLORS.buttonColor,
    borderRadius: 30,
    width: width * 0.8,
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  settingsText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
