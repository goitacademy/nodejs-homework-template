const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempDir, originalname } = req.file;
  const { _id } = req.user;

  try {
    const avatar = await jimp.read(tempDir);
    await avatar.autocrop().resize(250, 250);
    const [extention] = originalname.split(".").reverse();
    const newName = `${_id}.${extention}`;
    const resultDir = path.join(avatarsDir, newName);
    await fs.rename(tempDir, resultDir);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch {
    fs.unlink(tempDir);
    next();
  }
};

module.exports = updateAvatar;
