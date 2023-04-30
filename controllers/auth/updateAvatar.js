const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { ctrlWrapper } = require("../../utils");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, avatarName);

  await Jimp.read(resultUpload)
    .then((resultUpload) => {
      return resultUpload.resize(250, 250).write(resultUpload);
    })
    .catch((error) => console.log(error));

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
