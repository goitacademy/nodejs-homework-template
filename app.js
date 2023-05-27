const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
// const path = require("path");
// const { nanoid } = require("nanoid");
// const multer = require("multer");
// require("dotenv").config();

dotenv.config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// const avatarsDir = path.join(__dirname, "public ", "books");

// const avatars = [];

// app.post("app/avatars", upload.single("cover"), async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(avatarsDir, originalname);
//   await fs.rename(tempUpload, resultUpload);
//   const cover = path.join("avatars", originalname);
//   const newAvatars = {
//     id: nanoid,
//     ...req.body,
//     cover,
//   };
//   res.status(201).json(newAvatars);
// });

// app.get("/api/avatars", async (req, res) => {
//   res.json(avatars);
// });
module.exports = app;
