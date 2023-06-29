const app = require("./app");
const fs = require("fs").promises;
const path = require("path");
const uploadDir = path.join(process.cwd(), "tmp");
const storeImage = path.join(process.cwd(), "/public/avatars");

const { connectToDatabase } = require("./startup/database.js");
connectToDatabase();

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const port = process.env.PORT;

app.listen(port, () => {
  createFolderIsNotExist(uploadDir);
  createFolderIsNotExist(storeImage);
  console.log(`Server running. Use our API on port: ${port}`);
});