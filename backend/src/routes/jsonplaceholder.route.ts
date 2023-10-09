import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import JSONPlaceholderController from '@/controllers/jsonplaceholder.controller';

class JSONPlaceholderRoute implements Routes {
  public path = '/jsonplaceholder';
  public router = Router();
  public jsonPlaceholderController = new JSONPlaceholderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/posts`, this.jsonPlaceholderController.getPosts);
  }
}

export default JSONPlaceholderRoute;
