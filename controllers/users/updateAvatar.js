const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);

  Jimp.read(tempUpload)
    .then((image) => {
      return image.resize(250, 250).write(resultUpload);
    })
    .catch((err) => console.log(err));

  const avatarURL = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
