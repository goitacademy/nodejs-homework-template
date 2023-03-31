const { User } = require("../../schemas/userSchema");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avaUrl = path.join("public", "avatars", imageName);

    const image = await Jimp.read(resultUpload);
    await image.resize(250, 250);
    await image.write(resultUpload);

    await User.findByIdAndUpdate(req.user._id, { avaUrl });
    res.json({ avaUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
