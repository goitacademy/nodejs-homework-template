const fs = require("fs").promises;
const path = require("path");

const app = require("../app");
const db = require("../src/db");

require("dotenv").config();
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

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
const PORT = process.env.PORT || 3000;

db.then(() => {
  console.log("Database connection successful");

  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server no running. Error message: ${err.message}`);
  process.exit(1);
});
