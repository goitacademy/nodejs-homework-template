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

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .set("strictQuery", false)
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      createFolderIfNotExist(uploadDir);
      createFolderIfNotExist(imageStore);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

function signalHandler() {
  mongoose.disconnect();
  console.log(`Database disconnected`);
  process.exit();
}

process.on("SIGINT", signalHandler);
