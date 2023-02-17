const app = require("./app");
const fs = require("fs");
const { mkdir } = require("fs/promises");
require("dotenv").config();

const path = require("path");

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const AVATARS_DIR = path.join(process.cwd(), process.env.AVATARS_DIR);

const { connectMongo } = require("./src/db/connection");

const PORT = process.env.PORT || 8081;

const createFolder = async (path) => {
  try {
    if (!fs.existsSync(path)) {
      await mkdir(path, {
        recursive: true,
      });
      console.log("Folder created successfully");
    } else {
      console.log("Ok Folders already exists");
    }
  } catch (error) {
    console.log(error);
  }
};

const start = async () => {
  await connectMongo();
  app.listen(PORT, async (err) => {
    if (err) {
      console.log(`Err at server launch:`, err);
    }
    await createFolder(UPLOAD_DIR);
    await createFolder(AVATARS_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
