const fs = require("fs").promises;

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  console.log("folder: ", folder);

  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = { createFolderIsNotExist };
