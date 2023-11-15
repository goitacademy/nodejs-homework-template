const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const Jimp = require("jimp");

const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/users");

const app = express();

app.set("json spaces", 8);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const tmpDir = path.join(__dirname, "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const users = [];
const avatarDir = path.join(__dirname, "public", "avatars");

app.get("/users/avatars", (req, res) => {
  res.json(users);
});

app.post("/users/avatars", upload.single("avatar"), async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);

  try {
    await fs.access(resultUpload);
    await fs.unlink(resultUpload);
  } catch (error) {}

  await fs.rename(tmpUpload, resultUpload);

  const avatar = path.join("public", "avatars", originalname);
  const newUser = {
    id: nanoid(),
    ...req.body,
    avatar,
  };

  users.push(newUser);
  res.status(200).json({ avatarURL: avatar });
});

app.patch("/users/avatars", upload.single("avatar"), async (req, res) => {
  if (!req.file) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { path: tmpUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);

  try {
    await fs.access(resultUpload);
    await fs.unlink(resultUpload);
  } catch (error) {}

  try {
    const image = await Jimp.read(tmpUpload);
    await image.cover(250, 250).write(tmpUpload);
  } catch (error) {
    return res.status(500).json({ message: "Image processing error" });
  }

  await fs.rename(tmpUpload, resultUpload);

  const avatar = path.join("public", "avatars", originalname);
  const avatarURL = { avatar };

  res.status(200).json({ avatarURL });
});

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
