const app = require("./app");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs").promises;
const uploadDir = path.join(process.cwd(), "public", "avatars");
const storeImage = path.join(process.cwd(), "public", "avatars");

require("dotenv").config();
const uriDB = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const connections = mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fileAlreadyExists = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folderName) => {
  if (!(await fileAlreadyExists(folderName))) {
    await fs.mkdir(folderName);
  }
};

connections
  .then(() => {
    app.listen(PORT, function () {
      createFolderIfNotExist(uploadDir);
      createFolderIfNotExist(storeImage);
      console.log(
        `Database connection successful. Server running on port ${PORT}`
      );
    });
  })
  .catch((e) => {
    console.log(`Server not running. Error : ${e.message}`);
    process.exit(1);
  });
