const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const avatarsDir = path.join("./", "public", "avatars");

const updeteAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  try {
    const uniqueFileName = `${uuidv4()}${path.extname(originalname)}`;
    const resizedImagePath = path.join(avatarsDir, uniqueFileName);

    const avatar = await Jimp.read(tmpUpload);
    avatar.resize(250, 250);
    await avatar.writeAsync(resizedImagePath);

    const avatarURL = path.join("avatars", uniqueFileName);
    await fs.unlink(tmpUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
      avatarURL,
    });
  } catch {
    throw HttpError(401);
  }
};

module.exports = updeteAvatar;