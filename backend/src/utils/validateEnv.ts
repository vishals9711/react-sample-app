import { cleanEnv } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    // Add your environment variables here
    // NODE_ENV: str(),
    // PORT: port(),
  });
};

export default validateEnv;
