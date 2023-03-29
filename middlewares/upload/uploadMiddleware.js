const multer = require("multer");
const { resolve, join } = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { HttpError } = require("../../helpers/httpError");

const tempDir = resolve("./tmp");
const avatarsDir = resolve("./public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({ storage });

const uploadMiddleware = async (req, res, next) => {
  if (!req.file) next(HttpError(415, "File not provided"));

  const { _id } = req.user;
  const { path, originalname } = req.file;

  await Jimp.read(path)
    .then((img) => {
      return img.resize(250, 250).quality(60).write(path);
    })
    .catch((err) => {
      console.error(err);
      throw new HttpError(400, err.message);
    });

  try {
    const userAvatarName = `${_id}_${originalname}`;
    const publicPath = join(avatarsDir, userAvatarName);

    await fs.rename(path, publicPath);

    next();
  } catch (error) {
    fs.unlink(path, (err) => {
      if (err) next(new Error(err));
    });
    next(HttpError(415, "File type unsupported"));
  }
};

module.exports = {
  upload,
  uploadMiddleware,
};
