const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/User");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const avatarPath = path.join(__dirname, "..", "..", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: oldPath, filename } = req.file;

  const image = await Jimp.read(oldPath);
  image.resize(250, 250);
  await image.writeAsync(oldPath);

  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  newAvatarURL = path.join("avatars", filename);

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL: newAvatarURL },
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    avatarURL: newAvatarURL,
  });
};

module.exports = ctrlWrapper(updateAvatar);
