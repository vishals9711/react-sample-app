import axios from 'axios';
import ICardData from '../models/Cards';

export const getPosts = async (): Promise<ICardData[]> => {
  try {
    const response = await axios.get<ICardData[]>(`api/v1/jsonplaceholder/posts`);
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log or throw an exception
    console.error('Error fetching posts:', error);
    throw error;
  }
};
