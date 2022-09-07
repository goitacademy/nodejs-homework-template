const fs = require("fs").promises;
const path = require("path");

const isAcessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

const createFolderIfItDoesntExist = async (folder) => {
  try {
    if (!(await isAcessible(folder))) {
      await fs.mkdir(folder);
    }
  } catch (e) {
    console.log("not enough permissions");
    process.exit(1);
  }
};

module.exports = isAcessible;
module.exports = createFolderIfItDoesntExist;
