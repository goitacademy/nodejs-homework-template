import fs from "fs/promises";

const createFolderIfNotExist = async (path) => {
  const isAccessible = (path) => {
    return fs
      .access(path)
      .then(() => true)
      .catch(() => false);
  };

  if (!(await isAccessible(path))) {
    try {
      await fs.mkdir(path);
    } catch (error) {
      process.exit(1);
    }
  }
};

export default createFolderIfNotExist;
