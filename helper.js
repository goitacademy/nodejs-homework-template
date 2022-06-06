const { exec } = require("child_process");
const fs = require("fs").promises;

const isAccesible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folder) => {
  if (!(await isAccesible(folder))) {
    await fs.mkdir(folder);
  }
};

const isImage = (path) => {
  return new Promise((resolve) => {
    exec(`convert ${path} -rotate 0 ${path}`, (err, stdout, stderr) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
};

module.exports = { createFolderIfNotExist, isImage };
