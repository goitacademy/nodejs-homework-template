import path from "path";
import multer from "multer";

export const tmpDir = path.join(process.cwd(), "tmp");
export const avatarDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadMiddleware = multer({ storage });
