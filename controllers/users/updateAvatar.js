const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { users: operations } = require("../../services");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resizeImg = await Jimp.read(tempUpload);
    resizeImg
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);

    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);
    await operations.updateAvatar(id, avatarURL);

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
