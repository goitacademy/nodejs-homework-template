const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { NotFound } = require("http-errors");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, filename } = req.file;
  const { _id: id } = req.user;
  const [extention] = filename.split(".").reverse();
  const avatarName = `${id}.${extention}`;
  try {
    const img = await jimp.read(tempUpload);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .quality(60)
      .writeAsync(tempUpload);

    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("src", "public", "avatars", avatarName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw NotFound(`User's avatar with id: ${id} is not upload`);
  }
};

module.exports = { updateAvatar };
