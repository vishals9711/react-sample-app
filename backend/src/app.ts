import compression from 'compression';
import { LOG_FORMAT, NODE_ENV, PORT } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { stream } from '@utils/logger';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware';
import path from 'path';

class App {
  public app: Express;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    // Create an Express application
    this.app = express();

    // Get environment, port, and initialize routes and error handling
    this.env = NODE_ENV || 'development';
    this.port = PORT;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    // Set up middleware functions
    this.app.use(morgan(LOG_FORMAT, { stream })); // Logging with Morgan
    this.app.use(compression()); // Gzip compression
    this.app.use(express.json()); // Parse JSON requests
    this.app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

    // Serve static files in production mode
    if (this.env === 'production') {
      this.app.use(express.static(path.join(__dirname, '../build')));
    }
  }

  private initializeRoutes(routes: Routes[]) {
    // Configure routes for the application
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router); // Prefix routes with '/api/v1/'
    });

    // Serve the React app's HTML file in production
    if (this.env === 'production') {
      this.app.get('/', this.homePageHandler);
    } else {
      // Default route for development
      this.app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
      });
    }
  }

  private homePageHandler(req: Request, res: Response) {
    // Serve the HTML file for the home page in production
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }

  private initializeErrorHandling() {
    // Configure error handling middleware
    this.app.use(errorMiddleware);
  }
}

export default App;
