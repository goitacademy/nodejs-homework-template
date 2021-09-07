const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// For adding avatar
const fs = require("fs/promises");
const multer = require("multer");
const path = require("path");

// ========================
const api = require("./api");

const app = express();

// Connecting to the DB
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(async () => {
    // app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => console.log(error));

// Обработчик тела запроса в формате json
app.use(express.json()); // чтобы put и patch запросы считывались
app.use(cors()); // испоьзуем мидлвару, чтобы появились кроссдоменные запросы

app.use("/api/v1/auth", api.auth);
app.use("/api/v1/contacts", api.contacts);

const usersDir = path.join(process.cwd(), "/public/avatars"); //путь к постоянной папке для сохранения аватара
app.use("/avatars", express.static(usersDir)); //раздаем статику из постоянной папки

// Processing of non-existant requests
app.use((_, res) => {
  res.status(404).send({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

// Processing of mistakes
app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    error,
  });
});

// Preparing multer
// Path to the temporary file
// const tempDir = path.join(process.cwd(), "temp");

// After multer takes a file from the corresponding field -
// what should it do to it, how to save
// const storageSettings = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     filesize: 10000,
//   },
// });

// Creating multer middleware
// const uploadMiddleware = multer({
//   storage: storageSettings,
// });

// Making request
// app.post(
//   "/profile",
//   uploadMiddleware.single("avatar"),
//   async (req, res, next) => {
//     // console.log(req.file);
//     try {
//       const result = await User.create(req.body);
//       const newUserDir = path.join(usersDir, result._id);
//       await fs.mkdir(newUserDir);
//       const { path: tempName, originalname } = req.file;

//       const [extension] = originalname.split(".").reverse();
//       const fileName = path.join(newUserDir, `avatar.${extension}`);
//       await fs.rename(tempName, fileName);
//       await User.findByIdAndUpdate(result._id, { avatar: fileName });
//     } catch (error) {
//       await fs.unlink(tempName); // если произошла ошибка, пытаемся удалить файл
//       next(error);
//     }
//   }
// );

module.exports = app;
