import multer from "multer";
import path from "path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    const uinquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uinquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const upload = multer({
  storage,
  limits,
});

export default upload;
