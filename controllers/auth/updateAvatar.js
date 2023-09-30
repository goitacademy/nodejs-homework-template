const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  // Rename and remove avatar
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  try {
    const avatar = await Jimp.read(tempUpload);
    avatar.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", filename);

    // Update avatar URL in DB
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
