const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatars = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const fileName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, originalname);

    const img = await Jimp.read(tempUpload);
    await img
      .autocrop()
      .contain(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER,
        Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", fileName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatars;
