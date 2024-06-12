import React, {useState, useEffect} from 'react';
import axiosClient from '../apis/static-server';

export interface Pest {
  id: number;
  pest_name: string;
  description: string;
  danger_scale: string;
  history: string;
  habitat: string;
  represent_image: string;
  info_link: string;
}

const useFetchDataPest = () => {
  const [pestData, setData] = useState<Pest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/pests');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching pests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {pestData, loading};
};

export default useFetchDataPest;
