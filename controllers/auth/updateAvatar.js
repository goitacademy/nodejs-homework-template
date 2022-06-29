const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id: id } = req.user;
    const { filename, path: tempPath } = req.file;
    const [extension] = filename.split(".").reverse();
    const name = `${id}.${extension}`;
    const newDir = path.join(avatarsDir, name);
    const img = await Jimp.read(tempPath);
    img.cover(250, 250);
    await img.writeAsync(tempPath);
    await fs.rename(tempPath, newDir);
    const avatarURL = path.join("avatars", name);
    const result = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    );
    res.json({
      avatarURL: result.avatarURL,
    });
  } catch (error) {
    if (error.message.includes("not such file")) {
      await fs.unlink(req.file.path);
    }
    throw error;
  }
};

module.exports = updateAvatar;
