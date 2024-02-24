const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const isAccessible = (path) =>
  fs
    .access(path)
    .then(() => true)
    .catch(() => false);

const setupFolder = async (path) => {
  const folderAvailable = await isAccessible(path);
  if (!folderAvailable) {
    try {
      await fs.mkdir(path);
    } catch (err) {
      console.log("No permissions!", err);
    }
  }
};

const tempDir = path.join(process.cwd(), "tmp");
const mainImagesDir = path.join(process.cwd(), "public/avatars");

const initUploadFolders = async () => {
  await setupFolder(tempDir);
  await setupFolder(mainImagesDir);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid()}${path.extname(file.originalname)}`);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimeTypeWhiteList = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const uploadMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimeTypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

const AVATAR_WIDTH = 250;
const AVATAR_HEIGHT = 250;

const processAndValidateImage = async (tempFilePath) => {
  try {
    const image = await Jimp.read(tempFilePath);
    const w = image.getWidth();
    const h = image.getHeight();

    const cropWidth = Math.min(w, AVATAR_WIDTH);
    const cropHeight = Math.min(h, AVATAR_HEIGHT);

    const centerX = Math.round((w - cropWidth) / 2);
    const centerY = Math.round((h - cropHeight) / 2);

    await image
      .crop(centerX, centerY, cropWidth, cropHeight)
      .resize(AVATAR_WIDTH, AVATAR_HEIGHT)
      .writeAsync(tempFilePath);

    const newFileName = nanoid() + path.extname(tempFilePath);
    const newFilePath = path.join(mainImagesDir, newFileName);

    await fs.rename(tempFilePath, newFilePath);
    return newFilePath;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  uploadMiddleware,
  processAndValidateImage,
  initUploadFolders,
};
