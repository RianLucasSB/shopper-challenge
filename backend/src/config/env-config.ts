import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../../.env') });

const getEnvConfig = () => {
  return {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    PORT: process.env.PORT || 3000,
  };
};

export const envConfig = getEnvConfig();
