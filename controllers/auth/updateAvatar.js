const fs = require("fs/promises");
const path = require("path");
const { HttpError } = require("../../helpers");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;

  const avatar = await Jimp.read(tempUpload);
  avatar.resize(250, 250);
  avatar.write(tempUpload);

  const { authorization } = req.headers;

  if (!authorization) {
    throw HttpError(401);
  }

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
