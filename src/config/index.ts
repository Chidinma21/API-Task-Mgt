import path from 'path';
import dotenv from 'dotenv';

import { Config } from '../types';

dotenv.config({ path: path.resolve(__dirname, '../env/.env') });

const config: Config = {
  app: process.env.APP,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  commitHash: process.env.CI_COMMIT_SHORT_SHA,
  mongoUri: process.env.MONGO_URI
};

export default config;
