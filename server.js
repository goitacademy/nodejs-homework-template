const app = require("./app");
const mongoose = require("mongoose");
const {
  createFolderIfNotExist,
  uploadDir,
  imageStore,
} = require("./middlewares/upload");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.set("strictQuery", true);

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log(`Database connection successful`);
    app.listen(PORT, () => {
      createFolderIfNotExist(uploadDir);
      createFolderIfNotExist(imageStore);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

function signalHandler() {
  mongoose.disconnect();
  console.log(`Database disconnected`);
  process.exit();
}

process.on("SIGINT", signalHandler);
