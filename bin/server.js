require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

const IMG_DIR = path.resolve('./public/avatars');
const TMP_DIR = path.resolve('./tmp');

const app = require('../app');

const { connectContactsDB } = require('../dataBase/connection');

const PORT = process.env.PORT || 3000;

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

async function startApp() {
  try {
    await connectContactsDB();

    app.listen(PORT, async error => {
      if (error) {
        console.error('Error at server launch:', error);
        process.exit(1);
      }
      await createFolderIsNotExist(TMP_DIR);
      await createFolderIsNotExist(IMG_DIR);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
}

startApp();
