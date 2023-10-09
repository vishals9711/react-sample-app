import { NextFunction, Request, Response } from 'express';
import JSONPlaceholderService from '@/services/jsonplaceholder.service';

class JSONPlaceholderController {
  public jsonPlaceholderService = new JSONPlaceholderService();

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.jsonPlaceholderService.getPosts();
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default JSONPlaceholderController;
