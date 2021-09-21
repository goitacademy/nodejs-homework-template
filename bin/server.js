const app = require("../app");
const db = require("../config/db");
const createFolderIsNotExist = require("../helpers/create-folder");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const TMP_DIR = process.env.TMP_DIR;
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(TMP_DIR);
    await createFolderIsNotExist(AVATAR_OF_USERS);
    console.log(`Database connection successful, port: ${PORT}`);
  });
}).catch((e) => {
  console.log(`Error: ${e.message}`);
});
