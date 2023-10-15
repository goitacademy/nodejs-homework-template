const mongoose = require("mongoose");
require("dotenv").config();
const createFolderIfNotExist = require("./helpers/multer");
const path = require("path");

const express = require("express");
const app = express();
const contactRoutes = require("./routes/api/contacts.routes");
const authRoutes = require("./routes/api/user.routes");

const PORT = process.env.PORT || 4000;

const publicDir = path.join(__dirname, "public");
const uploadDir = path.join(__dirname, "public/tmp");
const storeImage = path.join(__dirname, "public/avatars");

const connection = mongoose.connect(process.env.DATABASE_URL, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
require("./config/passport");
app.use("/api", contactRoutes);
app.use("/api/auth", authRoutes);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      createFolderIfNotExist(publicDir);
      createFolderIfNotExist(uploadDir);
      createFolderIfNotExist(storeImage);
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error while establishing connection: [${error}]`);
    process.exit(1);
  });
app.use("/api/contacts", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
