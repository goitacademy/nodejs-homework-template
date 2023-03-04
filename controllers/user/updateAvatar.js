const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imgName = `${id}_${originalname}`;

  try {
    const { _id } = req.user;

    const jimpImg = await jimp.read(tempUpload);
    await jimpImg.resize(250, 250);
    await jimpImg.writeAsync(tempUpload);

    const resultUpload = path.join(avatarsDir, imgName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imgName);

    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;