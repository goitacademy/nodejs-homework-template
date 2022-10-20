const fs = require("fs/promises");
const Jimp = require("jimp");

const path = require("path");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const img = await Jimp.read(tempUpload);
    await img.cover(250, 250);
    await img.writeAsync(tempUpload);

    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
