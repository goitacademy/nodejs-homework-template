import multer from "multer";
import path from "path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = {
  filesize: 5 * 1024 * 1024,
};

const upload = multer({
  storage,
  limits,
});

export default upload;
