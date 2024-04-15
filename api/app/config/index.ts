import * as dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file.");
}

export default {
    PORT: process.env.APP_PORT || 5000,
    redisURL: process.env.REDIS_URL || 'redis://:@localhost:6379',
};
 