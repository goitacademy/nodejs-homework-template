const { app, uploadDir, storeDir } = require("./app");
const mongoose = require("mongoose");
const { createFolderIfNotExist } = require("./helper");
require("dotenv").config();

const uriDb = process.env.DB_URI;
const port = process.env.PORT;

require("./config/passport");

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, async () => {
      createFolderIfNotExist(uploadDir);
      createFolderIfNotExist(storeDir);
      console.log("Server is running!");
    });
  })
  .catch(() => {
    console.log("Connection error!");
    process.exit(1);
  });
