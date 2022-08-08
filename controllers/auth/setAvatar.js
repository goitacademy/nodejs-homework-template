const path = require("path");

const { basedir } = global;
const Jimp = require("jimp");

const fs = require("fs/promises");

const { User } = require(`${basedir}/models/user`);

const avatarDir = path.join(basedir, "public", "avatars");

const setAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;
    const [extension] = originalname.split(".").reverse();
    const newName = `${_id}.${extension}`;
    const ulploadPath = path.join(avatarDir, newName);

    await Jimp.read(tempPath)
      .then((avatarImage) => {
        return avatarImage.resize(250, 250).write(tempPath);
      })
      .catch((err) => {
        throw err;
      });

    await fs.rename(tempPath, ulploadPath);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = setAvatar;
