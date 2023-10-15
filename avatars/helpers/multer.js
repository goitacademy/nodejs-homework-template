const fs = require("fs").promises;

const folderAlreadyExist = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folderName) => {
  if (!(await folderAlreadyExist(folderName))) {
    await fs.mkdir(folderName);
  }
};

module.exports = createFolderIfNotExist;
