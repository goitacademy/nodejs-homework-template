const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

require("dotenv").config();

const authRouter = require("./routes/api/auth");

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");
const { upload } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// const path = require("path");

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.post("/public", upload.single("image"), async (req, res) => {
  console.log(req.file);
});

module.exports = app;
