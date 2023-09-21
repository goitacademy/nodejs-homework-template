import multer from "multer";
import path from "path";

const uploadDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDir);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
});
export const uploadImage = upload.single("avatar");
