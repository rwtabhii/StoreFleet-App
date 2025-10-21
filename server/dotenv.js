import { configDotenv } from "dotenv";
import path from 'path';
// Load .env file
configDotenv({ path: path.resolve('./config/uat.env') });
// Create an env object for easy access
const env = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  COOKIE_EXPIRES_IN: process.env.COOKIE_EXPIRES_IN,
  SMTP_MAIL: process.env.STORFLEET_SMPT_MAIL,
  SMTP_MAIL_PASSWORD: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
  SMTP_SERVICE: process.env.SMPT_SERVICE,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};

export default env;
