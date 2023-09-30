const app = require('./app')
const fs = require("fs").promises;

const path = require("path");
const uploadDir = path.join(process.cwd(), "tmp");
const storeImage = path.join(process.cwd(), "/public/avatars");

const isExist = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (path) => {
  if (!(await isExist(path))) {
    await fs.mkdir(path);
  }
};

const port = 3000;

app.listen(port, () => {
  createFolderIfNotExist(uploadDir);
  createFolderIfNotExist(storeImage);
  console.log(`Server running. Use our API on port: ${port}`);
});


module.exports = createFolderIfNotExist;