const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const imgDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id: id } = req.user;
    const { filename } = req.file;
    const [extension] = filename.split(".").reverse();
    const name = `${id}.${extension}`;
    const newDir = path.join(imgDir, name);
    await fs.rename(req.file.path, newDir);
    const avatarURL = path.join("avatars", name);
    await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    if (error.message.includes("no such file or directory")) {
      await fs.unlink(req.file.path);
    }
    throw error;
  }
};

module.exports = updateAvatar;
