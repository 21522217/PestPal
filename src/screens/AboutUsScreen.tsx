import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '../theme/theme';

const { width } = Dimensions.get('window');

const AboutUsScreen: React.FC = () => {
  const handleButtonPress = () => {

  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.paragraph}>
          Welcome to PestPal, your ultimate resource for pest identification and information. Our mission is to provide comprehensive and reliable data on various pests, helping you understand and manage them effectively. 
        </Text>
        <Text style={styles.paragraph}>
          At PestPal, we believe that knowledge is power. Our team of experts and enthusiasts work tirelessly to gather and verify information about pests, their habitats, histories, and dangers. Whether you are a homeowner, gardener, farmer, or just curious, PestPal is here to assist you with all your pest-related queries.
        </Text>
        <Text style={styles.paragraph}>
          Our database is constantly updated to ensure you have access to the latest findings and insights. We aim to empower you with the knowledge you need to keep your environment safe and pest-free.
        </Text>
        <Text style={styles.paragraph}>
          Thank you for choosing PestPal. Together, we can make pest management easier and more effective.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c299f2',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 22,
  },
  button: {
    position: 'absolute',
    bottom: 200,
    left: width * 0.1,
    right: width * 0.1,
    backgroundColor: COLORS.buttonColor,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AboutUsScreen;
