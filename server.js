import { app } from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI } = process.env;

export const dataBase = mongoose.connect(MONGODB_URI, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection to Data Base is closed");
  process.exit();
});

const PORT = 3000;

dataBase
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(`Server not run. Error:${error.message}`);
  });
