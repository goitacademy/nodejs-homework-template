import express from "express";
import multer from "multer";
import logger from "morgan";
import cors from "cors";
import { nanoid } from "nanoid";
import api from "./routes/api/index.js";
import setJWTStrategy from "./config/config-passport.js";
import path from "path";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const tempDir = path.join(process.cwd(), "temp");
const storageImage = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid()}${file.originalname}`);
  },
});

const extensionWitheList = [".jpg", ".jpeg", "png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const uploadMiddleware = multer({
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
app.post(
  "/upload",
  uploadMiddleware.single("pciture"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "File isn't a photo" });
    }
    res.json(req.file);
  }
);
app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setJWTStrategy();
app.use("/api", api);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
