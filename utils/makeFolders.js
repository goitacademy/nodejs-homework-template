const fs = require("fs/promises");

const isAccessible = async (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderNotExisting = async (dir) => {
  if (!(await isAccessible(dir))) {
    await fs.mkdir(dir);
  }
};

module.exports = { createFolderNotExisting };
