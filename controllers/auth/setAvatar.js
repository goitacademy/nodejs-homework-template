const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User, schemas } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const setAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;
    const [extension] = originalname.split(".").reverse();
    const newName = `${_id}.${extension}`;
    const uploadPath = path.join(avatarsDir, newName);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = path.join("avatars", newName);
    const normalAvatarURL = path.join("public/avatars", newName);

    Jimp.read(normalAvatarURL, (error, newName) => {
      if (error) throw error;
      newName.resize(250, 250).quality(60).write(normalAvatarURL);
    });

    await User.findByIdAndUpdate(_id, { avatarURL: normalAvatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = setAvatar;
