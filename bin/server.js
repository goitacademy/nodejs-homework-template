const app = require("../app");
const db = require("../model/db");
const createFolder = require("../helpers/create-dir");

require("dotenv").config();

const PORT = process.env.PORT || 3030;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
// const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
const path = require("path");
const AVATAR_OF_USERS = path.join(process.cwd(), process.env.AVATAR_OF_USERS);

db.then(() => {
  app.listen(PORT, async () => {
    await createFolder(UPLOAD_DIR);
    await createFolder(AVATAR_OF_USERS);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((e) => {
  console.log("ERROR:", e.message);
  process.exit(1);
});
