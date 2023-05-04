const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, filename } = req.file;
  const avatarName = `${_id}_${filename}`;

  const resultUpload = path.join(avatarsDir, avatarName);
  Jimp.read(resultUpload, (err, lenna) => {
    if (err) throw err;
    lenna.resize(250, 250).quality(60).greyscale().write(resultUpload);
  });
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });


  res.json({ avatarURL });
};

module.exports = updateAvatar;
