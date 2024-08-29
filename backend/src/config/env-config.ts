import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../../../.env') });

const getEnvConfig = () => {
  return {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    PORT: process.env.PORT || '3000',
  };
};

export const envConfig = getEnvConfig();