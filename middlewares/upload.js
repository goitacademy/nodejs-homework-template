// import multer from "multer";
// import path from "path";

// import { HttpError } from "../helpers/index.js";

// // const destination = path.resolve("public", "avatars");
// const destination = path.resolve("tmp");

// const storage = multer.diskStorage({
//   destination,
//   filename: (req, file, cb) => {
//     const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
//     const filename = `${uniquePrefix}_${file.originalname}`;
//     cb(null, filename);
//   },
// });

// const limits = {
//   fileSize: 5 * 1024 * 1024,
// };

// const fileFilter = (req, file, cb) => {
//   const extension = file.originalname.split(".").pop();
//   if (extension === "exe") {
//     return cb(HttpError(400, "Invalid file extension"));
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   limits,
//   fileFilter,
// });

// export default upload;
import multer from "multer";
import path from "path";

const tmpPath = path.resolve("tmp");
// const avatarsPath = path.resolve("public", "avatars");

const storage = multer.diskStorage({
  destination: tmpPath,
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
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return cb(HttpError(400, "Invalid file extension"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

// export { upload, avatarsPath };
export default upload;
