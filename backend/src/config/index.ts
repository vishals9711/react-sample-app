import { config } from 'dotenv';
config({ path: `.env` });

export const { NODE_ENV, PORT = 5001, LOG_FORMAT = ':method :url :status :res[content-length] - :response-time ms', LOG_DIR = 'logs' } = process.env;
