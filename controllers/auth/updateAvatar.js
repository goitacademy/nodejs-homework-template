const path = require("path");

const fs = require("fs/promises");

const jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const User = require("../../models/users");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatar = await jimp.read(resultUpload);
  await avatar.resize(250, 250).write(resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    status: 'Success',
    code: 200,
    data: {
      result: { avatarURL },
    },
  })
};

module.exports = updateAvatar;
