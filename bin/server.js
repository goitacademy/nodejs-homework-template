const app = require("../app");
const db = require("../model/db");
const createFolderIsExist = require("../helpers/create-dir");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Стартуем сервер только тогда, если коннект.к бд
db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const AVATARS = process.env.AVATARS;
    await createFolderIsExist(UPLOAD_DIR);
    await createFolderIsExist(AVATARS);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
