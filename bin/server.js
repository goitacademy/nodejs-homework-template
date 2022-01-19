const app = require('../app');
const db = require('../model/db');
const createFolderIsExist = require('../service/create-dir');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const TMP_DIR = process.env.TMP_DIR;
    const AVATAR_URL = process.env.AVATAR_URL;
    await createFolderIsExist(TMP_DIR);
    await createFolderIsExist(AVATAR_URL);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});