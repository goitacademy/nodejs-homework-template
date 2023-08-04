const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// const fs = require('fs/promises');
// const jimp = require('jimp');
// const { nanoid } = require("nanoid");
require("dotenv").config();

const authRouter = require("./routes/api/auth")
const contactsRouter = require("./routes/api/contacts")

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const tmpDir = path.join(__dirname, "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({
  storage: multerConfig
})

const contacts = [];

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
})
// upload.fields([{name: "avatar", maxCount: 2}, {name: "subAvatar", maxCount: 3}])
// upload.array("avatar",8)
// const avatarDir = path.join(__dirname, "public", "avatars");
// app.post("/api/contacts", upload.single("avatar"), async (req, res) => {
//   const { path: tmpUpload, originalname } = req.file;
//   if (req.file) {
//     const { file } = req
//     const img = await jimp.read(file.path)
//     img.autocrop()
//       .cover(
//         250,
//         250,
//         jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(file.path)
//   }
//   const resultUpload = path.join(avatarDir, originalname);
//   await fs.rename(tmpUpload, resultUpload);
//   const avatar = path.join("avatars", originalname);
//   const newContact = {
//     id: nanoid(),
//     ...req.body,
//     avatar,
//   };
//   contacts.push(newContact);

//   res.status(201).json(newContact)
// })

app.use("/api/auth", authRouter)
app.use("/api/contacts", contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
})

module.exports = app
