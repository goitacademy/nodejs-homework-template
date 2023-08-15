const { User } = require("../../models/user");
const path = require("path");
// const fs = require("fs/promises");
const Jimp = require("jimp");
const { HttpError } = require("../../utilities");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  try {
    const avatar = await Jimp.read(tempUpload);
    avatar.resize(250, 250).quality(70).write(resultUpload);
    // await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch {
    throw HttpError(500);
  }
};

module.exports = updateAvatar;
