import { HttpException } from '@exceptions/HttpException';
import axios from 'axios';

class JSONPlaceholderService {
  public getPosts = async () => {
    try {
      const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      return posts.data;
    } catch (error) {
      throw new HttpException(500, error);
    }
  };
}

export default JSONPlaceholderService;
