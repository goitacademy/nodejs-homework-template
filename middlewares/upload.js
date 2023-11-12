import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";
import Jimp from "jimp";
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

const AVATAR_WIDTH = 250;
const AVATAR_HEIGHT = 250;

export const isImageAndTransform = async (path) =>
  new Promise((resolve) => {
    Jimp.read(path, async (err, image) => {
      if (err) resolve(false);

      try {
        const w = image.getWidth();
        const h = image.getHeight();

        const cropWidth = w > AVATAR_WIDTH ? AVATAR_WIDTH : w;
        const cropHeight = h > AVATAR_HEIGHT ? AVATAR_HEIGHT : h;

        const centerX = Math.round(w / 2 - cropWidth / 2);
        const centerY = Math.round(h / 2 - cropHeight / 2);

        await image
          .rotate(360)
          .crop(
            centerX < 0 ? 0 : centerX,
            centerY < 0 ? 0 : centerY,
            cropWidth,
            cropHeight
          )
          .write(path);
        resolve(true);
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  });
