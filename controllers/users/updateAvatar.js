const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

async function resize(avatar) {
  const image = await Jimp.read(avatar);
  image.resize(250, 250).write("small.png");
}

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  const avatarName = `${id}_${originalname}`;
  try {
    const avatar = await Jimp.read(tempUpload);
    avatar.resize(250, 250);
    avatar.write(tempUpload);
    const resultUpload = path.join(avatarDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
