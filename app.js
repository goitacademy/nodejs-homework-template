import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
// import multer from "multer";
// import path from "path";
// import fs from "fs/promises";

import { router as contactsRouter } from "./routes/api/contacts.js";
import usersRouter from "./routes/api/users.js";
import setJWTStrategy from "./config/jwt.js";


// const uploadDir = path.join(process.cwd(), "public/avatars");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   // limits:
// });

// const uploadMiddleware = multer({
//   storage,
// });

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const isAccessible = (folderPath) => {
//   return fs
//     .access(folderPath)
//     .then(() => true)
//     .catch(() => false);
// };

// const createFolderIfNotExist = async (folderPath) => {
//   if (!(await isAccessible(folderPath))) {
//     await fs.mkdir(folderPath);
//   }
// };

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'))


setJWTStrategy();
// createFolderIfNotExist(uploadDir);

app.use("/", contactsRouter);
app.use("/users", usersRouter);

// app.post("/photos", uploadMiddleware.single("photo"), (req, res) => {
//   return res.status(200).json({ message: "plik dodany" });
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
