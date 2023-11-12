import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";
const tempDir = path.join(process.cwd(), "temp");
const storageImage = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const extensionWitheList = [".jpg", ".jpeg", "png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;
    if (
      !extensionWitheList.includes(extension) ||
      !mimetypeWhiteList.includes(mimeType)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
