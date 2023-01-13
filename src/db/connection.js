import * as dotenv from 'dotenv'; // to get variables from .env
import { mongoose } from 'mongoose';
mongoose.set('strictQuery', true);

dotenv.config();

export const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Database connection successful');
};
