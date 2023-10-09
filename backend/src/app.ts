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
    this.app = express();
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
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    if (this.env === 'production') {
      this.app.use(express.static(path.join(__dirname, '../build')));
    }
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
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
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
