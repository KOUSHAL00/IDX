import axios from '../configs/axiosConfig';

export const pingApi = async () => {
  try {

    const response = await axios.get('/api/v1/ping');

    console.log('Ping response:', response.data);

    return response.data;

  } catch (error) {
    console.error('Error pinging the server:', error);
    throw error;
  }
}