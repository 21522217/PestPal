import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Avatar, Button, Text, Card, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../theme/theme';

const { width } = Dimensions.get('window');

const SettingsScreen: React.FC = () => {
  return (
    <LinearGradient colors={['#c299f2', '#b399f2']} style={styles.linearGradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar
          rounded
          source={require('../assets/profile-icon.png')}
          size="xlarge"
          containerStyle={styles.profileIcon}
        />
        <Text style={styles.name}>Yoku Pham</Text>
        <Card containerStyle={styles.infoCard}>
          <Text style={styles.info}>Info 1</Text>
          <Text style={styles.info}>Info 2</Text>
          <Text style={styles.info}>Info 3</Text>
        </Card>
        <Button
          title="Settings"
          icon={
            <Icon
              name="settings"
              type="material"
              size={24}
              color="white"
              style={styles.settingsIcon}
            />
          }
          buttonStyle={styles.settingsButton}
          titleStyle={styles.settingsText}
          onPress={() => console.log('Navigate to settings')}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileIcon: {
    marginBottom: 20,
    marginTop: 50,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoCard: {
    width: width * 0.9,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    marginBottom: 30,
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  settingsButton: {
    borderRadius: 30,
    width: width * 0.8,
    paddingVertical: 15,
    backgroundColor: COLORS.buttonColor,
  },
  settingsText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  settingsIcon: {
    marginRight: 10,
  },
});

export default SettingsScreen;
