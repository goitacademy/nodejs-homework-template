require("dotenv").config();
require("./server.js");
const path = require("node:path");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const auth = require("./middleware/auth");

const userRoutes = require("./routes/api/users");
const contactRoutes = require("./routes/api/contacts");
const avatarRoutes = require("./routes/api/upload");
const multer = require("multer");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));
app.use("/api/users", userRoutes);
app.use("/api/contacts", auth, contactRoutes);
app.use("/api/upload", auth, avatarRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.message === "Unexpected field") {
      return res.status(404).json({ message: "Invalid body" });
    }
  }

  res.status(500).json({ message: error.message });
});

module.exports = app;
