import dotenv from 'dotenv';

dotenv.config();
export default {
  host: process.env.DATABASE_HOST,
  port: 3050,
  database: process.env.DATABASE_PATH,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
};
