import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { AppStackParamList, ImageType } from '../types';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../theme/theme';
import { Card } from 'react-native-elements';

type HistoryScreenRouteProp = RouteProp<AppStackParamList, 'HistoryScreen'>;

const { width } = Dimensions.get('window');
const defaultImageUri =
  'https://i.pinimg.com/736x/fd/c3/4f/fdc34f1242de5e350ab92449f866e513.jpg';

const HistoryScreen = () => {
  const route = useRoute<HistoryScreenRouteProp>();
  const [descriptions, setDescriptions] = useState<ImageType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<ImageType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state for the ActivityIndicator

  const cardBackgroundColor = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Ensure loading state is true at the start
        const response = await axios.get(
          'https://pestpal-static-backend.onrender.com/pests'
        );
        const data = response.data.map((item: any) => ({
          id: item.id,
          represent_image: item.represent_image,
          pest_name: item.pest_name,
          habitat: item.habitat,
          history: item.history,
          danger_scale: item.danger_scale,
          additionalImages: [defaultImageUri, defaultImageUri, defaultImageUri],
        }));
        setDescriptions(data);
        setFilteredData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Ensure loading state is set to false after fetch attempt
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.images) {
      setDescriptions(route.params.images);
      setFilteredData(route.params.images);
      setLoading(false); // Data is loaded, set loading to false
    }
  }, [route.params]);

  useEffect(() => {
    setFilteredData(
      descriptions.filter((image) =>
        image.pest_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, descriptions]);

  const handleMoreInfo = (image: ImageType) => {
    setSelectedImage(image);
    setModalVisible(true);
    setCurrentIndex(0);
  };

  const startCardAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cardBackgroundColor, {
          toValue: 1,
          duration: 2000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(cardBackgroundColor, {
          toValue: 0,
          duration: 2000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startCardAnimation();
  }, []);

  const backgroundColorInterpolate = cardBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#f0f0f0'], // More noticeable color change
  });

  const renderImageItem = ({ item }: { item: ImageType }) => (
    <Animated.View
      style={[styles.card, { backgroundColor: backgroundColorInterpolate }]}
    >
      <Image
        source={{ uri: item.represent_image || defaultImageUri }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.pest_name}</Text>
        <Text style={styles.dangerScale}>Danger Scale: {item.danger_scale}</Text>
        <Text style={styles.description}>{item.habitat}</Text>
        <TouchableOpacity onPress={() => handleMoreInfo(item)}>
          <Text style={styles.moreInfo}>More Information</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderCarouselItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.modalImage} />
  );

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    setCurrentIndex(roundIndex);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a0dad" style={{ transform: [{ scale: 1.5 }] }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Icon style={styles.searchIcon} color={COLORS.mainText} name="search1" size={40} />

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
              <Icon style={styles.closeButton} color={'black'} name="closesquare" />
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
                <Card containerStyle={styles.infoCard}>
                  <Text style={styles.modalDescription}>
                    {selectedImage.habitat}
                  </Text>
                  <Text style={styles.modalHistory}>{selectedImage.history}</Text>
                </Card>
                <Card containerStyle={styles.dangerCard}>
                  <Text style={styles.modalDangerScale}>
                    Danger Scale: {selectedImage.danger_scale}
                  </Text>
                </Card>

                <Text style={styles.modalInfoLink}>
                  Click for more Information on Google
                </Text>
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
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    fontSize: 20,
    color: 'gray',
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c299f2',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  infoCard: {
    // backgroundColor: '#c299f2',
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: -24,
  },
  dangerCard: {
    backgroundColor: '#ef6351',
    borderRadius: 15,
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'Arial',
    letterSpacing: 1.2,
  },
  dangerScale: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
    fontFamily: 'Arial',
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 5,
    fontFamily: 'Arial',
  },
  moreInfo: {
    marginTop: 5,
    color: '#1E90FF',
    textDecorationLine: 'underline',
    fontFamily: 'Arial',
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
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    left: 160,
    fontSize: 30,
    color: 'black',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    fontFamily: 'Arial',
    letterSpacing: 1.2,
  },
  modalImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 15,
    margin: 5,
    resizeMode: 'cover',
  },
  carouselContainer: {
    alignItems: 'center',
  },
  modalDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#34495e',
    fontFamily: 'Arial',
  },
  modalHistory: {
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e',
    fontFamily: 'Arial',
  },
  modalDangerScale: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Arial',
  },
  modalInfoLink: {
    fontSize: 16,
    color: '#1E90FF',
    textDecorationLine: 'underline',
    fontFamily: 'Arial',
  },
});

export default HistoryScreen;
