const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contact.routes");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const fs = require("fs").promises;
const path = require("path");

require("dotenv").config();

const app = express();

// parse application/json
app.use(express.json());
// cors
app.use(cors());

require("./config/config-passport");

app.use("/api", contactRoutes, authRoutes, uploadRoutes);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts, /api/users",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

// Folders for uploading avatars

const uploadDir = path.join(process.cwd(), ".tmp");
const storeAvatarDir = path.join(process.cwd(), "public", "avatars");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      createFolderIfNotExist(uploadDir);
      createFolderIfNotExist(storeAvatarDir);
      console.log(
        `Database connection successful. Server running. Use Contacts API on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(
      `Connection error. Server not running. Error message: ${err.message}`
    );
    process.exit(1);
  });
