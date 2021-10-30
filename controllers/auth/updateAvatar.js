const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const uploadPath = path.join(avatarsDir, originalname);
  try {
    const file = await Jimp.read(tempPath);
    await file.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);
    const avatar = `/avatars/${originalname}`;
    await User.findByIdAndUpdate(req.user._id, { avatarURL: avatar });
    res.json({ status: "success", code: 200, data: { avatarURL: avatar } });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateAvatar;
