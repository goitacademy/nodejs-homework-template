import multer from "multer";
import { join } from "path";

export const UPLOAD_DIRECTORY = join(process.cwd(), "tmp");
export const STORE_AVATARS_DIRECTORY = join(process.cwd(), "public", "avatars");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, UPLOAD_DIRECTORY);
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now().toString()}_${file.originalname}`);
  },
  limits: {
    fileSize: 1048576,
  },
});

export const upload = multer({
  storage: storage,
});
