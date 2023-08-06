const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const { User } = require("../../models/index.js");

const avatarDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    throw HttpError(400, "Avatar must be provided");
  }

  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(tempUpload); // save
    })
    .catch((err) => {
      throw err;
    });

  const fileName = `${_id}_${originalname}`;

  const publicUpload = path.join(avatarDir, fileName);

  await fs.rename(tempUpload, publicUpload);

  const avatarUrl = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = updateAvatar;
