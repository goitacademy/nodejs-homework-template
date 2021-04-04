const app = require("../app");
const db = require("../db");
const path = require("path");
const { createFolderIsNotExist } = require("../helpers/createFolder");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);
    console.log(`Server running. Use our API on port: ${PORT}...`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
});
