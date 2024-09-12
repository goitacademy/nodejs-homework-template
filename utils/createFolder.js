const fs = require("fs").promises;
const path = require("path");

const uploadDir = path.join(process.cwd(), "tmp");
const storeAvatars = path.join(process.cwd(), "public", "avatars");

const isAccessible = async (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExists = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder, { recursive: true });
  }
};

const initFolders = async () => {
  try {
    await createFolderIfNotExists(uploadDir);
    await createFolderIfNotExists(storeAvatars);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  initFolders,
};
