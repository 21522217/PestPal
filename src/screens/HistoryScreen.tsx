// HistoryScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { AppStackParamList, ImageType } from '../types';  // Import the types

type HistoryScreenRouteProp = RouteProp<AppStackParamList, 'HistoryScreen'>;

const HistoryScreen = () => {
  const route = useRoute<HistoryScreenRouteProp>();
  const [descriptions, setDescriptions] = useState<ImageType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.images) {
      setDescriptions(route.params.images);
    }
  }, [route.params]);

  const handleMoreInfo = (image: ImageType) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {descriptions.map((image, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Bọ Hung</Text>
            <Text style={styles.description}>Tropical Forest</Text>
            <Text style={styles.description}>Good For Plants</Text>
            <TouchableOpacity onPress={() => handleMoreInfo(image)}>
              <Text style={styles.moreInfo}>More Information</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
            {selectedImage && (
              <>
                <Text style={styles.modalTitle}>Bọ Hung</Text>
                <Image source={{ uri: selectedImage.uri }} style={styles.modalImage} />
                <Text style={styles.modalDescription}>{selectedImage.description}</Text>
                <Text style={styles.modalInfoLink}>Click for more Information on Google</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  moreInfo: {
    marginTop: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    fontSize: 18,
    color: 'black',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalInfoLink: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default HistoryScreen;
