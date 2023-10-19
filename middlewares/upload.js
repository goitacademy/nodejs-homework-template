import multer from "multer";
import path from "path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const upload = multer({ storage, limits });

export default upload;
