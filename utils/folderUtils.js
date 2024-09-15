const fs = require("fs").promises;

const isAccessible = (path) =>
  fs.access(path)
    .then(() => true)
    .catch(() => false);

const setupFolder = async (path) => {
  const folderExists = await isAccessible(path);
  if (!folderExists) {
    try {
      await fs.mkdir(path);
    } catch (e) {
      console.error("No permissions to create folder!", e);
      process.exit(1);
    }
  }
};

module.exports = { setupFolder };