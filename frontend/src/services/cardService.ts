import axios from 'axios';
import ICardData from '../models/Cards';

/**
 * Fetches a list of posts from a JSONPlaceholder API.
 *
 * @returns {Promise<ICardData[]>} - A promise that resolves to an array of post data.
 * @throws {Error} - If there is an error while fetching the data.
 */
export const getPosts = async (): Promise<ICardData[]> => {
  try {
    // Send an HTTP GET request to the specified API endpoint.
    const response = await axios.get<ICardData[]>(`api/v1/jsonplaceholder/posts`);

    // Return the data obtained from the response.
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log the error message or throw an exception.
    console.error('Error fetching posts:', error);

    // Re-throw the error to propagate it to the caller.
    throw error;
  }
};
