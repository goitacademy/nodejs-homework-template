const { ctrlWrapper } = require("../../helpers");
const path = require("node:path");
const fs = require("node:fs/promises");
const User = require("../../models/users");
const Jimp = require("jimp");

async function uploadAvatar(req, res, next) {
  const newPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "avatars",
    req.file.filename
  );
  await fs.rename(req.file.path, newPath);
  const image = await Jimp.read(newPath);
  await image.resize(250, 250).writeAsync(newPath);
  const result = await User.findByIdAndUpdate(
    req.user.id,
    { avatarURL: `http://localhost:8080/avatars/${req.file.filename}` },
    { new: true }
  ).exec();
  if (result === null) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(`avatarURL: ${result.avatarURL}`);
}

module.exports = {
  uploadAvatar: ctrlWrapper(uploadAvatar),
};
