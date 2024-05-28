import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
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
    backgroundColor: '#fff',
  },
  profileIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
    padding: 10,
    marginTop: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
    width: '50%',
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  settingsText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
