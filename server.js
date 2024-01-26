import "dotenv/config.js";
import app from "./app.js";
import fs from "fs/promises";
import mongoose from "mongoose";
import { tmpDir, avatarDir } from "./modules/users/middlewares/avatar.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json" assert { type: "json" };

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const DB_HOST = process.env.DATABASE_URL;
const dbConnection = mongoose.connect(DB_HOST);

dbConnection
  .then(() => {
    console.log("Database connection successful");
    createFolderIfNotExist(tmpDir);
    createFolderIfNotExist(avatarDir);
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((e) => {
    console.log(`Error occured: ${e.message}`);
    process.exit(1);
  });

async function doesFolderExist(folderPath) {
  try {
    await fs.access(folderPath);
    return true;
  } catch {
    return flase;
  }
}

async function createFolderIfNotExist(folderPath) {
  if (!doesFolderExist(folderPath)) {
    await fs.mkdir(folderPath);
  }
  return;
}
