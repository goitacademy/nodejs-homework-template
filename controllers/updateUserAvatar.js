const Jimp = require("jimp");
const path = require("path");
const User = require("../models/user");
const fs = require("fs/promises");
const createResponse = require("../helpers/createResponse");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

async function updateUserAvatar(req, res, next) {
  const { path: tempUpload, originalname } = req.file;
  const { id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    await Jimp.read(tempUpload, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).write(resultUpload);
    });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    createResponse(200, res, { avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
}

module.exports = updateUserAvatar;
