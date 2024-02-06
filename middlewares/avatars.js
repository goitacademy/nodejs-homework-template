import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import createFolderIfNotExist from "../controllers/service/createFolderIfNotExist.js";
import Jimp from "jimp";

const uploadDir = path.join(process.cwd(), "tmp");
const avatarsDir = path.join(process.cwd(), "public/avatars");

await createFolderIfNotExist(uploadDir);
await createFolderIfNotExist(avatarsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${file.originalname}`);
  },
  // limits:
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const uploadMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const jimpProcess = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "File isn't a photo" });
  }
  const { path: temporaryPath } = req.file;
  const extension = path.extname(temporaryPath);
  const fileName = `${uuidv4()}${extension}`;
  const filePath = path.join(avatarsDir, fileName);

  console.log(filePath);
  try {
    await Jimp.read(temporaryPath)
      .then((image) => {
        image
          .contain(250, 250) // resize
          .quality(100) // set JPEG quality
          .writeAsync(filePath); // save
        // const newUrl = `${avatarsDir}/${req.user._id}.${image.getExtension()}`;
        return (req.body.newUrl = filePath);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (e) {
    return next(e);
  }
  next();
};

export { uploadMiddleware, jimpProcess };
