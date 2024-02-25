const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const fs = require("fs").promises;

const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(uriDb);

const createFolders = async () => {
  const publicFolderPath = path.join(process.cwd(), "public");
  const avatarsFolderPath = path.join(publicFolderPath, "avatars");
  const temporaryFolderPath = path.join(process.cwd(), "tmp");
  try {
    await fs.access(temporaryFolderPath);
  } catch (error) {
    await fs.mkdir(temporaryFolderPath);
  }
  try {
    await fs.access(publicFolderPath);
  } catch (error) {
    await fs.mkdir(publicFolderPath);
  }

  try {
    await fs.access(avatarsFolderPath);
  } catch (error) {
    await fs.mkdir(avatarsFolderPath);
  }
};

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      createFolders();
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
