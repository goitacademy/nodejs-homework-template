const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();
const { DB_HOST: urlDb } = process.env;

const { tempDir, storeImageDir, setupFolder } = require("./controllers/fileController/fileController.js");

const startServer = async () => {
  try {
    await mongoose.connect(urlDb);

    console.log("Database connection successful");

    await setupFolder(tempDir);
    await setupFolder(storeImageDir);

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();