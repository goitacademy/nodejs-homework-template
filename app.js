const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();

require("dotenv").config();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// const tempDir = path.join(__dirname, "temp");
// const avatarsDir = path.join(__dirname, "public", "avatars");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   }
// });

// const upLoad = multer({
//   storage: multerConfig,
// })

// const avatars = [];

// app.post('/avatars', upLoad.single("avatar"), async (req, res) => {
//   const { path: tempUpload, filename } = req.file;
//   const resultUpload = path.join(avatarsDir, filename);
//   await fs.rename(tempUpload, resultUpload);  
//   try {
//      const { name } = req.body;
//   const avatar = path.join("public", "avatars", filename);
//   const newAvatar = {
//     name,
//     avatar,
//   }
//   avatars.push(newAvatar);
//   return res.status(201).json(newAvatar);
//   } catch (error) {
//     await fs.unlink(tempUpload);
//  }
// })

// app.get('/avatars', upLoad.single("avatar"), async (req, res) => {
//   res.json(avatars);
//  })


app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {

  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
    res.status(status).json({
      message,
    })
 
})

module.exports = app
