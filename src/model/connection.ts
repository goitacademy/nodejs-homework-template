import mongoose from "mongoose";
import { DB_NAME, DB_URL } from "../config";

const connectMongo = async (): Promise<void> => {
  await mongoose.connect(DB_URL, { dbName: DB_NAME });
};

export = connectMongo;
