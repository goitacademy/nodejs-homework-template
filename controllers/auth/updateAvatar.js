const { User } = require("../../models/userSchema");
const path = require("path");
const fs = require("fs/promises");
const { createError } = require("../../helpers");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  console.log(req);

  try {
    if (!req.file) {
      throw createError(400, "Bad Request. Please add avatar image.");
    }
    const { path: tempDir, originalname } = req.file;
    const { _id } = req.user;
    const [extention] = originalname.split(".").reverse();
    const newName = `${_id}.${extention}`;
    const resultDir = path.join(avatarDir, newName);
    await fs.rename(tempDir, resultDir);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(201).json(avatarURL);
    next();
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.tempDir);
    }
    next(error);
  }
};

module.exports = updateAvatar;
