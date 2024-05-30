// /api/imageApi.js
import axios from 'axios';
import {Alert} from 'react-native';

export const handleImageResponse = async (
  uri: string | undefined,
  setLabel: React.Dispatch<React.SetStateAction<string>>,
) => {
  const formData = new FormData();
  formData.append('file', {
    uri: uri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });

  try {
    const response = await axios.post(
      'http://localhost:8000/predict',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    setLabel(response.data.predicted_class);
    Alert.alert('Label', `The label is: ${response.data.predicted_class}`);
  } catch (error) {
    console.error('Error uploading image:', error);
    Alert.alert('Error', 'Failed to upload image');
  }
};
