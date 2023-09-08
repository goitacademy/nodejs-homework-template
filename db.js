import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
``
export const mongoClient = new MongoClient(
  process.env.MONGODB_CONNECTION_STRING,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

export const dbConnect = async () => {
  try {
    await mongoClient.connect();
    console.log("MongoDB connection established");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

export const dbDisConnect = async () => {
  await mongoClient.close();
  console.log("MongoDB connection closed");
};
