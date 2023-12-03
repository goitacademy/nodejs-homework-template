// server.js
require("dotenv").config();
const { app } = require("./app");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const { PORT, CONNECTION_MONGODB } = require("./utils/variables");

const startServer = async () => {
  // tmp folder exists
  const tmpFolderPath = path.join(__dirname, "./tmp");
  if (!fs.existsSync(tmpFolderPath)) {
    fs.mkdirSync(tmpFolderPath);
  }

  // the public/avatars folder exists
  const avatarsFolderPath = path.join(__dirname, "public", "avatars");
  if (!fs.existsSync(avatarsFolderPath)) {
    // the public folder exists
    const publicFolderPath = path.join(__dirname, "public");
    if (!fs.existsSync(publicFolderPath)) {
      fs.mkdirSync(publicFolderPath);
    }

    // the public/avatars folder exists
    fs.mkdirSync(avatarsFolderPath);
  }

  try {
    await mongoose.connect(CONNECTION_MONGODB);
    console.log("Database connection successful");
    app.listen(PORT || 3000, () => {
      console.log(`Server running. Use our API on Port:${PORT || 3000}`);

      //   console.log(`Server is running on http://localhost:${PORT || 3000}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

startServer();
