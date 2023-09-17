const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const fs = require("node:fs").promises;
const createError = require("http-errors");

const config = require("./config/config");
const app = express();

const contactsRoutes = require("./routes/api/contacts.routes");
const usersRoutes = require("./routes/api/auth.routes");
const uploadRoutes = require("./routes/api/upload.routes");

const PORT = process.env.PORT || 4000;
const uriDb = process.env.DATABASE_URL;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api", contactsRoutes, uploadRoutes);
app.use("/api/users", usersRoutes);

app.use(express.static("public"));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message, status: err.status });
});

require("./config/config-passport");

const isAccessible = async (folder) => {
  try {
    await fs.access(folder);
    return true;
  } catch {
    return false;
  }
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder, {
      recursive: true,
    });
  } else {
    console.log("Directories are already created");
  }
};

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      createFolderIsNotExist(config.AVATARS_PATH);
      createFolderIsNotExist(config.TMP_DIR);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: [${err}]`);
    process.exit(1);
  });