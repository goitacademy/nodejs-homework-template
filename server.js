const app = require("./app");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const { uploadDir, storeImage, createPublic } = require("./controller/users");

const PORT = process.env.PORT;
const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb, { dbName: "mydb" });

const isAccessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

connection
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderIsNotExist(uploadDir);
      await createFolderIsNotExist(createPublic);
      await createFolderIsNotExist(storeImage);
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

module.exports = {
  connection,
};
