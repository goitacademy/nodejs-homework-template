const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises
const nanoid = require('nanoid')
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const tempDir = path.join(__dirname, 'temp');
const multerCongig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname) // переіменовуємо вхідний файл
  },
});

const upload = multer({
  storage: multerCongig,
  limits: '',
})

const contacts = [];

const avatarsDir = path.join(__dirname, 'public', 'avatars')
app.use("/api/auth", upload.single('avatarURL'), authRouter, async( req, res) => {
  const {path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname)

  await fs.rename(tempUpload, resultUpload);
  const avatarURL  = path.join( 'avatars', originalname);

  const newContact = {
      id: nanoid(),
      ...req.body,
      avatarURL,
  }

  contacts.puch(newContact)
  console.log(contacts)
  res.status(201).json(newContact);
});
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

module.exports = app;
