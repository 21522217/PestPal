import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { AppStackParamList, ImageType } from '../types';  // Import the types

type HistoryScreenRouteProp = RouteProp<AppStackParamList, 'HistoryScreen'>;

const HistoryScreen = () => {
  const route = useRoute<HistoryScreenRouteProp>();
  const initialImages: ImageType[] = [
    {
      uri: 'data:image/jpeg;base64,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',
      title: 'Bọ Hung',
      description: 'Là 1 loài bọ',
      additionalInfo: 'Là 1 loài bọ cánh cứng',
      additionalImages: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJfm5igD508MEnPcQLMiiEntRfWiMLypTdxA&s',
        'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
        'https://www.mdpi.com/insects/insects-15-00165/article_deploy/html/images/insects-15-00165-g030-550.jpg'
      ]
    },
    {
      uri: 'data:image/jpeg;base64,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',
      title: 'Dọ Hung',
      description: 'Là 1 loài bọ',
      additionalInfo: 'Là 1 loài bọ cánh cứng',
      additionalImages: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJfm5igD508MEnPcQLMiiEntRfWiMLypTdxA&s',
        'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
        'https://www.mdpi.com/insects/insects-15-00165/article_deploy/html/images/insects-15-00165-g030-550.jpg'
      ]
    },
    {
      uri: 'data:image/jpeg;base64,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',
      title: 'Cọ Hung',
      description: 'Là 1 loài bọ',
      additionalInfo: 'Là 1 loài bọ cánh cứng',
      additionalImages: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJfm5igD508MEnPcQLMiiEntRfWiMLypTdxA&s',
        'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
        'https://www.mdpi.com/insects/insects-15-00165/article_deploy/html/images/insects-15-00165-g030-550.jpg'
      ]
    },
  ];

  const [descriptions, setDescriptions] = useState<ImageType[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<ImageType[]>(initialImages);

  useEffect(() => {
    if (route.params?.images) {
      setDescriptions(route.params.images);
      setFilteredData(route.params.images);
    }
  }, [route.params]);

  useEffect(() => {
    setFilteredData(
      descriptions.filter(image =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, descriptions]);

  const handleMoreInfo = (image: ImageType) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const renderImageItem = ({ item }: { item: ImageType }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity onPress={() => handleMoreInfo(item)}>
          <Text style={styles.moreInfo}>More Information</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
            {selectedImage && (
              <>
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <ScrollView horizontal pagingEnabled>
                  {selectedImage.additionalImages.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={styles.modalImage} />
                  ))}
                </ScrollView>
                <Text style={styles.modalDescription}>{selectedImage.additionalInfo}</Text>
                <Text style={styles.modalInfoLink}>Click for more Information on Google</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c299f2',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    paddingLeft: 15,
    backgroundColor: 'white',
  },
  listContainer: {
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
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
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  moreInfo: {
    marginTop: 5,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
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
    color: '#333',
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  modalInfoLink: {
    fontSize: 14,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default HistoryScreen;