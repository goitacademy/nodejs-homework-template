const fs = require("fs/promises");
const jimp = require("jimp");
const path = require("path");
const User = require("../models/user");

const uploadAvatar = async (req, res, next) => {
  try {
    const { file, user } = req;
    const { path: tempPath, filename } = file;
    const uploadPath = path.join(process.cwd(), "public/avatars", filename);

    const image = await jimp.read(tempPath);
    await image.cover(250, 250).quality(90).write(tempPath);

    await fs.rename(tempPath, uploadPath);

    user.avatarURL = `/avatars/${filename}`;
    await user.save();

    return res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    return next(error);
  }
};

module.exports = { uploadAvatar };
