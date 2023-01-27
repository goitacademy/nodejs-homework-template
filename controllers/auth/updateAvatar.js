const path = require("path");
const { User } = require("../../models/users");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  // get avatar path and file name from req.file
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  // unique name
  const avatarNewName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, avatarNewName);

    const img = await Jimp.read(tempUpload);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", avatarNewName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
