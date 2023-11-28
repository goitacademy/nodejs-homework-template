const User = require("../models/user");

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { HttpError } = require("../helpers");

const updateAvatar = async (req, res) => {
  const avatarsDir = path.join(__dirname, "../", "public", "avatars");
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(404, "Not found!");
  }

  const resize = async (fileDir) => {
    const image = await Jimp.read(fileDir);
    image
      .resize(250, Jimp.AUTO)
      .cover(250, 250, Jimp.VERTICAL_ALIGN_MIDDLE)
      .write(fileDir);
  };

  const { path: tempURL, filename } = req.file;

  await resize(tempURL);
  const resultURL = path.join(avatarsDir, filename);

  await fs.rename(tempURL, resultURL);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(
    _id,
    { avatarURL, avatarImage: filename },
    { new: true }
  ).exec();

  res.status(200).json({
    avatarURL,
  });
};

const getAvatar = async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id).exec();
  if (user === null) {
    return res.status(404).send({ message: "User not found" });
  }

  if (!user.avatarURL) {
    return res.status(404).send({ message: "Avatar not found" });
  }

  res.sendFile(path.join(__dirname, "..", "public/", user.avatarURL));
};

module.exports = { updateAvatar, getAvatar };
