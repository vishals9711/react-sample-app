import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import http from 'http';
import { Server } from 'socket.io';
import JSONPlaceholderRoute from './routes/jsonplaceholder.route';
validateEnv();

// Create an instance of the Express application and specify the routes to use
const app = new App([new IndexRoute(), new JSONPlaceholderRoute()]);

// Create an HTTP server using the Express application
const server = http.createServer(app.getServer());

// Create a Socket.IO server and configure it with CORS settings
export const io = new Server(server, {
  cors: {
    origin: '*', // Allow requests from any origin (you may want to restrict this in production)
    methods: ['GET', 'POST'], // Allow specified HTTP methods
    credentials: true, // Enable credentials (e.g., cookies) for cross-origin requests
  },
});

// Start the server by listening on the specified port
server.listen(app.port, () => console.log(`Server running on port ${app.port}`));
