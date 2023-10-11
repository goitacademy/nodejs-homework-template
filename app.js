import express from "express";
import logger from "morgan";
import cors from "cors";
import multer from "multer";
import path, { join } from "path";
import fs from "fs/promises";
import "dotenv/config";
import contactsRouter from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// multer
const tempDir = path.resolve("temp");
const avatarsDir = path.resolve("public", "avatars");
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage: multerConfig });

app.use("/api/contacts", contactsRouter);

app.patch("/users/avatars", upload.single("avatarURL"), async (req, res) => {
  console.log("req.file :>> ", req.file); // del
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.resolve(avatarsDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  res.status(401).json({ message: `File have saved in ${resultUpload}` });
});

app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "404 Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
