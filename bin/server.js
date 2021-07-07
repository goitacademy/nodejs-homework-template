const app = require('../app');
const { connectMongo } = require('../src/db/connection');
const fs = require('fs').promises;
const { TEMP_DIR, AVATARS_DIR } = require('../src/helpers/uploadTemp');

const PORT = process.env.PORT || 3000;

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

const start = async () => {
  try {
    await connectMongo();
    app.listen(PORT, async (err) => {
      await createFolderIsNotExist(TEMP_DIR);
      await createFolderIsNotExist(AVATARS_DIR);
      if (err) {
        console.error('Error at server lanch', err);
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Faied to launch application with error ${err.message}`);
  }
};
start();
