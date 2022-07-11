const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/userSchema");
const { createError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError(400, "Bad Request. Please add avatar image.");
    }
    const { path: tempDir, originalname } = req.file;
    const { _id } = req.user;
    const [extention] = originalname.split(".").reverse();
    const newName = `${_id}.${extention}`;
    const resultDir = path.join(avatarsDir, newName);
    await fs.rename(tempDir, resultDir);
    const file = await Jimp.read(resultDir);
    const fileResize = await file.resize(250, 250);
    await fileResize.write(resultDir);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.tempDir);
    }
    next(error);
  }
};

module.exports = updateAvatar;
