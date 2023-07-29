const fs = require("fs/promises");
const path = require("path");
const { User, defaultAvatar } = require("../../models/user");
const booksDir = path.join(__dirname, "../", "../", "public", "avatars");

const avatars = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const newName = `${_id}_${originalname}`;
  const user = await User.findById(_id);

  const resultUpload = path.join(booksDir, newName);
  await fs.rename(tempUpload, resultUpload);
  const cover = path.join("avatars", newName);

  if (user.avatarURL !== defaultAvatar) {
    const prevAvatar = path.join(booksDir, "../", user.avatarURL);
    await fs.unlink(prevAvatar);
  }
  await User.findByIdAndUpdate(_id, { avatarURL: cover });
  res.status(201).json({ message: cover });
};

module.exports = avatars;
