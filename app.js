require("dotenv").config();

require("./db");

const path = require("node:path");
const multer = require("multer");
const express = require("express");

const logger = require("morgan");
const cors = require("cors");
const auth = require("./middleware/auth.js");
const contactsRouter = require("./routes/contacts");
const userRoutes = require("./routes/auth");
const avatarRoutes = require("./routes/users");
const app = express();

app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/contacts", contactsRouter);
app.use("/auth", userRoutes);
app.use("/users", auth, avatarRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.message === "Unexpected field") {
      return res.status(404).send({ message: "Invalid body" });
    }
  }
  res.status(500).json({ message: err.message });
});

module.exports = app;
