import { config } from 'dotenv';
config({ path: `.env` });

console.log(`.env.${process.env.NODE_ENV || 'development'}.local`);

export const { NODE_ENV, PORT, LOG_FORMAT = ':method :url :status :res[content-length] - :response-time ms', LOG_DIR } = process.env;
