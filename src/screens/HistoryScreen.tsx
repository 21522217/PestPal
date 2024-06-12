import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import useFetchDataPest, {Pest} from '../hooks/useFetchDataPest';
import {useRoute, RouteProp} from '@react-navigation/native';
import {AppStackParamList, ImageType} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';

type HistoryScreenRouteProp = RouteProp<AppStackParamList, 'HistoryScreen'>;

const {width} = Dimensions.get('window');
const defaultImageUri =
  'https://i.pinimg.com/736x/fd/c3/4f/fdc34f1242de5e350ab92449f866e513.jpg';

const HistoryScreen = () => {
  const route = useRoute<HistoryScreenRouteProp>();
  const [selectedImage, setSelectedImage] = useState<Pest | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {pestData, loading} = useFetchDataPest();

  useEffect(() => {
    const fetchData = () => {
      try {
        const data = pestData.map((item: Pest) => ({
          id: item.id,
          represent_image: item.represent_image,
          pest_name: item.pest_name,
          habitat: item.habitat,
          history: item.history,
          danger_scale: item.danger_scale,
          additionalImages: [],
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleMoreInfo = (image: Pest) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const renderImageItem = ({item}: {item: Pest}) => (
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
      <FlatList data={pestData} renderItem={renderImageItem} />
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
