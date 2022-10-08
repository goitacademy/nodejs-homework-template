const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const { RequestError } = require("../../helpers");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const avatarName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, avatarName);
  try {
    await fs.rename(tmpUpload, resultUpload);

    const avatarFile = await jimp.read(resultUpload);
    await avatarFile.resize(250, 250).write(resultUpload);
    const avatarURL = path.join("avatars", avatarName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw RequestError(400, error.message);
  }
};

module.exports = updateAvatar;
