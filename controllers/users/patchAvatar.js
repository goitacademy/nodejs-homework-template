const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "..", "..", "public", "avatars");

const patchAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;

  const { _id: id } = req.user;
  const unicName = `${id}_${originalname}`;

  await Jimp.read(tempUpload)
    .then((image) => {
      image.resize(250, 250).write(tempUpload);
    })
    .catch((err) => {
      next(err);
    });
  const resultUpload = path.join(avatarDir, unicName);
  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", unicName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = {
  patchAvatar,
};
