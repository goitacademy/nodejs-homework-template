const app = require("../src/app");
const db = require("../src/db");

const { createFolderIsNotExist } = require("../src/helpers/create-folder");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = process.env.PUBLIC_DIR;
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(PUBLIC_DIR);
    await createFolderIsNotExist(AVATAR_OF_USERS);

    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`${err.message}`);
});
