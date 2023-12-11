import multer from "multer";
import path from "path";
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
  filesize: 5 * 1024 * 1024,
};

// const fileFilter = (req, file, cb) => {
//   const extention = file.originalname.split(".").pop();
//   if (extention === "exe") {
//     cb(HttpError(400, "Invalid file extention"));
//   }
// };

const upload = multer({
  storage,
  limits,
  // fileFilter
});

export default upload;
