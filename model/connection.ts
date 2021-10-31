import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.DB_URL!;
const DB_NAME = process.env.DB_NAME;

const connectMongo = async () : Promise<void> => {
  await mongoose.connect(DB_URL, {dbName: DB_NAME});
};

export = connectMongo;
