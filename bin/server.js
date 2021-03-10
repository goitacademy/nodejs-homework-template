const app = require('../app');
const db = require('../model/db');
const createFolderIsExist = require('../helpers/create-dir');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

db.then(() => {
  try {
    app.listen(PORT, async () => {
      const UPLOAD_DIR = process.env.UPLOAD_DIR;
      const USERS_AVATARS = process.env.USERS_AVATARS;
      await createFolderIsExist(UPLOAD_DIR);
      await createFolderIsExist(USERS_AVATARS);

      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
});
