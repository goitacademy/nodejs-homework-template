const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./src/helpers/apiHelpers");
const contactsRouter = require("./src/routes/contactRoutes");
const authRouter = require("./src/routes/authRoutes");
const filesRouter = require("./src/routes/filesRoutes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use("/avatars", express.static("public/avatars"));
app.use("/avatars", express.static(__dirname + "/src/public/avatars"));
// app.use("/avatars", express.static("arc/public/avatars"));
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/files", filesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
