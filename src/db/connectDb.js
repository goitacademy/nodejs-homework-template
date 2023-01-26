import * as dotenv from 'dotenv';
import { mongoose } from 'mongoose';

dotenv.config();

const { MONGO_URL } = process.env;
mongoose.set('strictQuery', true);

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error while connecting to mongoDb', error.message);
    process.exit(1); //exit with error
  }
};
