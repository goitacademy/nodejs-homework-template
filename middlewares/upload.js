import multer from "multer";
import path from "path";
import { HttpError } from "../helpers/HttpError.js";

const uploadDirectory = path.join(__dirname, "../public/avatars", "uploads");

const multerConfig = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      const newFileName = file.fieldname + "-" + uniqueSuffix + fileExtension;
      cb(null, newFileName);
    },
  }),
  limits: {
    fileSize: 1048576, 
  },
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|gif/; 
    const extensionName = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extensionName && mimeType) {
      cb(null, true);
    } else {
      cb(new HttpError("Only jpeg, jpg, png or gif files are allowed"));
    }
  },
};

const upload = multer(multerConfig);

export default upload;
