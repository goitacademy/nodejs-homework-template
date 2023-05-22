const uploadAvatar = async (req, res) => {
  const path = require("path");
  const fs = require("fs/promises");
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, "../../tmp", filename);
  const publicPath = path.resolve(__dirname, "../../public/avatars", filename);
  const User = require("../../models/user");

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { avatarURL: `public/${filename}` },
    { new: true }
  );

  return res.json(user.avatarURL);
};

module.exports = uploadAvatar;
