const app = require("./app");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
const { tempDir } = require("./middleware/avatarUploader/avatarUploader");

require("dotenv").config();
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3000;

const isAccessToPath = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const ifNoAccessCreateFolder = async (folder) => {
  if (!(await isAccessToPath(folder))) {
    await fs.mkdir(folder);
  }
};

app.listen(PORT, () => {
  console.log("Server running. Use my API on port: 3000");
});

connection
  .then(() => {
    console.log(`Database connection successful`);
    ifNoAccessCreateFolder(tempDir);
    ifNoAccessCreateFolder(path.join(process.cwd(), "public", "avatars"));
  })

  .catch((err) => {
    console.log(`Database connection failed. Error message: ${err.message}`);
    process.exit(1);
  });
