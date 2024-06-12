import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import axios from 'axios';
import {AppStackParamList, ImageType} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';

type HistoryScreenRouteProp = RouteProp<AppStackParamList, 'HistoryScreen'>;

const {width} = Dimensions.get('window');
const defaultImageUri =
  'https://i.pinimg.com/736x/fd/c3/4f/fdc34f1242de5e350ab92449f866e513.jpg'; // Replace with a valid default image URL

const HistoryScreen = () => {
  const route = useRoute<HistoryScreenRouteProp>();
  const [descriptions, setDescriptions] = useState<ImageType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<ImageType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://pestpal-static-backend.onrender.com/pests',
        );
        const data = response.data.map((item: any) => ({
          id: item.id,
          represent_image: item.represent_image,
          pest_name: item.pest_name,
          habitat: item.habitat,
          history: item.history,
          danger_scale: item.danger_scale,
          additionalImages: [], // Assuming the API does not provide these yet
        }));
        setDescriptions(data);
        setFilteredData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.images) {
      setDescriptions(route.params.images);
      setFilteredData(route.params.images);
    }
  }, [route.params]);

  useEffect(() => {
    setFilteredData(
      descriptions.filter(image =>
        image.pest_name.toLowerCase().includes(searchQuery.toLowerCase()),
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
      <Image
        source={{uri: item.represent_image || defaultImageUri}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.pest_name}</Text>
        <Text style={styles.dangerScale}>
          Danger Scale: {item.danger_scale}
        </Text>
        <Text style={styles.description}>{item.habitat}</Text>
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
                <Text style={styles.modalTitle}>{selectedImage.pest_name}</Text>
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
                  {selectedImage.habitat}
                </Text>
                <Text style={styles.modalHistory}>{selectedImage.history}</Text>
                <Text style={styles.modalDangerScale}>
                  Danger Scale: {selectedImage.danger_scale}
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
  dangerScale: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
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
  modalHistory: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  modalDangerScale: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: 'red',
  },
  modalInfoLink: {
    fontSize: 14,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default HistoryScreen;
