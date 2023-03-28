const multer = require("multer");
const { resolve, join } = require("path");
const Jimp = require("jimp");
const fs = require("fs");
const { HttpError } = require("../../helpers/httpError");

const tempDir = resolve("./tmp");

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

const uploadMiddleware = multer({ storage });

const cropImageMiddleware = async (req, res, next) => {
  if (!req.file) next(HttpError(415, "File not provided"));

  const { path, filename } = req.file;
  console.log(req.file);

  try {
    const cropImgDir = join(tempDir, filename);

    const cropImg = await Jimp.read(path);

    cropImg.resize(250, 250).quality(60).write(cropImgDir);

    next();
  } catch (error) {
    fs.unlink(path, (err) => {
      if (err) next(new Error(err));
    });
    next(HttpError(415, "File type unsupported"));
  }
};

module.exports = { uploadMiddleware, cropImageMiddleware };
