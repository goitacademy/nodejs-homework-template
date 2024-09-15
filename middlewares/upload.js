import multer from "multer";
import path from "path";
import { HttpError } from "../helpers/HttpError.js";

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const maxSize = 1.5 * 1024 * 1024; // 1mb

export const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (file.filename !== "avatar") cb(null, false);

    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, and .jpeg format allowed!"));
    }
  },
  limits: {
    fileSize: maxSize,
  },
});
