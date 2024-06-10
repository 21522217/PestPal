import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {AppStackParamList, ImageType} from '../types';
import {COLORS} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

type HistoryScreenRouteProp = RouteProp<AppStackParamList, 'HistoryScreen'>;

const {width} = Dimensions.get('window');

const HistoryScreen = () => {
  const route = useRoute<HistoryScreenRouteProp>();
  const initialImages: ImageType[] = [
    {
      uri: 'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
      title: 'Bọ Hung',
      description: 'Là 1 loài bọ',
      additionalInfo: 'Là 1 loài bọ cánh cứng',
      additionalImages: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJfm5igD508MEnPcQLMiiEntRfWiMLypTdxA&s',
        'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
        'https://www.mdpi.com/insects/insects-15-00165/article_deploy/html/images/insects-15-00165-g030-550.jpg',
      ],
    },
    {
      uri: 'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
      title: 'Dọ Hung',
      description: 'Là 1 loài bọ',
      additionalInfo: 'Là 1 loài bọ cánh cứng',
      additionalImages: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJfm5igD508MEnPcQLMiiEntRfWiMLypTdxA&s',
        'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
        'https://www.mdpi.com/insects/insects-15-00165/article_deploy/html/images/insects-15-00165-g030-550.jpg',
      ],
    },
    {
      uri: 'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
      title: 'Cọ Hung',
      description: 'Là 1 loài bọ',
      additionalInfo: 'Là 1 loài bọ cánh cứng',
      additionalImages: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJfm5igD508MEnPcQLMiiEntRfWiMLypTdxA&s',
        'https://live.staticflickr.com/3193/5847507111_b2c35c4864_b.jpg',
        'https://www.mdpi.com/insects/insects-15-00165/article_deploy/html/images/insects-15-00165-g030-550.jpg',
      ],
    },
  ];

  const [descriptions, setDescriptions] = useState<ImageType[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<ImageType[]>(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (route.params?.images) {
      setDescriptions(route.params.images);
      setFilteredData(route.params.images);
    }
  }, [route.params]);

  useEffect(() => {
    setFilteredData(
      descriptions.filter(image =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, descriptions]);

  const handleMoreInfo = (image: ImageType) => {
    setSelectedImage(image);
    setModalVisible(true);
    setCurrentIndex(0);
  };

  const renderImageItem = ({item}: {item: ImageType}) => (
    <View style={styles.card}>
      <Image source={{uri: item.uri}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity onPress={() => handleMoreInfo(item)}>
          <Text style={styles.moreInfo}>More Information</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCarouselItem = ({item}: {item: string}) => (
    <Image source={{uri: item}} style={styles.modalImage} />
  );

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    setCurrentIndex(roundIndex);
  };

  return (
    <LinearGradient
      colors={[COLORS.mainBackground, COLORS.mainBackgroundSecond]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
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
                <FlatList
                  data={selectedImage.additionalImages}
                  horizontal
                  pagingEnabled
                  renderItem={renderCarouselItem}
                  keyExtractor={(item, index) => index.toString()}
                  onScroll={handleScroll}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.carouselContainer}
                />
                <Text style={styles.modalDescription}>
                  {selectedImage.additionalInfo}
                </Text>
                <Text style={styles.modalInfoLink}>
                  Click for more Information on Google
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
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
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
    margin: 5,
    resizeMode: 'cover',
  },
  carouselContainer: {
    alignItems: 'center',
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
