const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;
  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).quality(60).write(`./public/avatars/${filename}`);
  });
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;