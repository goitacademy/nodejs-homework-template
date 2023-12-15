const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const { tmpDir } = require("../../middlewares/uploader");
const HttpError = require("../../helpers/HttpError");

const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new HttpError(400, "No file provided"));
    }

    const imageBuffer = req.file.buffer;

    const image = await jimp.read(imageBuffer);
    await image.cover(250, 250).quality(85);

    const uniqueFileName = `${Date.now()}-${Math.floor(
      Math.random() * 10000
    )}${path.extname(req.file.originalname)}`;

    const tmpFilePath = path.join(tmpDir, uniqueFileName);

    await image.writeAsync(tmpFilePath);

    res.json({ avatarURL: uniqueFileName });
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = uploadAvatar;
