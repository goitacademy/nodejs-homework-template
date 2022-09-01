const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;
    await Jimp.read(tempUpload).then((avatar) => {
      return avatar.resize(250, 250).writeAsync(tempUpload);
    });
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      status: "success",
      code: 200,
      avatarURL: avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
