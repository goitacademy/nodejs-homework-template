const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const { userSchema } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const userUpdateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;
    const newPathUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, newPathUpload);
    const file = await jimp.read(newPathUpload);
    await file.resize(250, 250).write(newPathUpload);
    const avatarURL = path.join("avatars", newPathUpload);
    await userSchema.User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = userUpdateAvatar;
