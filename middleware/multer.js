import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidV4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, "../temp");
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, tempDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${uuidV4()}${path.extname(file.originalname.toLowerCase())}`);
  },
});

const extensionList = [".jpg", ".jpeg", ".png", ".gif"];

const upload = multer({
  storage,
  fileFilter: async (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (!extensionList.includes(extension) || !mimetype.startsWith("image/")) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default upload;
