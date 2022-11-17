const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  try {
    const extension = originalname.split(".").pop();
    const imgName = `${id}.${extension}`;
    const resultUpload = path.join(avatarsDir, imgName);
    await fs.rename(tempUpload, resultUpload);
    const resizeAvatar = await Jimp.read(resultUpload);
    await resizeAvatar.resize(250, 250).write(resultUpload);
    const avatarUrl = path.join("public", "avatars", imgName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
