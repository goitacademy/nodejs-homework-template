import multer from "multer";
import path from "path";
import { HttpError } from "../helpers/index.js";
const tempDir = path.resolve("temp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
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
    cb(HttpError(400, "Invalid file extention"));
  }
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});
export default upload;
