import path from "path";
import multer from "multer";

export const tmpDir = path.join(process.cwd(), "tmp");
export const avatarDir = path.join(process.cwd(), "public/avatars");
export const test1 = () => {
  console.log(process.cwd());
};

export function test2() {
  console.log(process.cwd());
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadMiddleware = multer({ storage });
