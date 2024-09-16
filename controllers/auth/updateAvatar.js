const { ctrlWrapper } = require("../../helpers");
const Jimp = require("jimp");
const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  // console.log(avatarsDir);
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  const avatarURL = path.join("avatar", filename);

  Jimp.read(tempUpload, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(resultUpload);
  });
  await fs.rename(tempUpload, resultUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });
  console.log(originalname);
  res.json({ avatarURL });
};
module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
