import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_DBNAME;
const uri = process.env.DB_URI;

export const connectDB = async () => {
  try {
    console.log(`[DB] Connecting to MongoDB: ${dbName} ...`.blue);
    await mongoose.connect(uri);
    console.log(`[DB] MongoDB: ${dbName} connected successfully`.blue);
  } catch (error) {
    console.error(
      `[DB] Error connecting to MongoDB: ${dbName} :${error.message}`.red
    );
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("[DB] MongoDB disconnected successfully".blue);
  } catch (error) {
    console.error(
      `[DB] Error disconnecting from MongoDB: ${error.message}`.red
    );
    process.exit(0);
  }
};

export function checkConnectionState() {
  const state = mongoose.connections[0].readyState;
  const stateText = mongoose.connections[0].states[state];
  console.log(`Current connection state: ${stateText}`);
  return state;
}
