import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import http from 'http';
import { Server } from 'socket.io';
import JSONPlaceholderRoute from './routes/jsonplaceholder.route';
validateEnv();

const app = new App([new IndexRoute(), new JSONPlaceholderRoute()]);

const server = http.createServer(app.getServer());

export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

server.listen(app.port, () => console.log(`Server running on port ${app.port}`));
