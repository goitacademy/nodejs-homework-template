const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models");
const { HttpError, jimpAvatar } = require("../../helpers");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const addAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Missing add avatar.");
  }
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  await jimpAvatar(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json(avatarURL);
};

module.exports = addAvatar;
