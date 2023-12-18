import multer from "multer";
import path from "path";
import { HttpError } from "../utils/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split("").pop();
  if (extention === "exe") {
    return cb(new HttpError(400, "Invalid file extention"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits,
});
