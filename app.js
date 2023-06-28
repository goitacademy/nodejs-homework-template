const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
// ==============
// const multer = require("multer");
// const path = require("path");

// const fs = require("fs/promises");
// const {v4} = require("uuid");
// ===========

// require("dotenv").config();
dotenv.config();

const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter);

// ===============================
// app.use(express.static("public"));


// const tempDir = path.join(__dirname, "temp");
// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// const avatars = [];
// app.get("/api/avatars", (req, res) => {
//   res.json(avatars);
// });

// // upload.fields([{name: "avatar", maxCount:2}, {name: "max-avatar", maxCount:3}])
// // upload.array("avatar", 5)
// // app.post("/api/avatars", upload.single("avatar"), async (req, res) => {
// //   console.log('req.body', req.body);
// //   console.log('req.file', req.file);
// // });

// const avatarsDir = path.join(__dirname, "public", "avatars");
// app.post("/api/avatars", upload.single("avatar"), async (req, res) => {
//   //   console.log('req.body', req.body);
//   // console.log('req.file', req.file);
//   // await fs.rename("./temp/fon-abstraktsiya-41.jpg", "./public/avatars/fon-abstraktsiya-41.jpg");

//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(avatarsDir, originalname);
//   await fs.rename(tempUpload, resultUpload);

//   // const avatar = path.join("public", "avatars",originalname);
//   const avatar = path.join( "avatars",originalname)
//   const newAvatar = {
//     id: v4(),
//     ...req.body,
//     avatar,
//   }
//   avatars.push(newAvatar);
//   res.status(201).json(newAvatar);
// });

// ================================

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
