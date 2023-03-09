const User = require("../../models/users");
const { createError } = require("../../helpers");

const path = require("path");
const fs = require("fs/promises");

const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

async function avatarUser(req, res, next) {
  try {
    const { _id } = req.user;
    const { path: tmpDir, originalname } = req.file;
    const [extention] = originalname.split(".").reverse();
    const newAvatarName = `${_id}.${extention}`;
    const uploadDir = path.join(avatarDir, newAvatarName);
    try {
      Jimp.read(tmpDir, (err, image) => {
        if (err) createError(400);
        image.resize(250, 250).quality(60).write(uploadDir);
      });
    } catch (error) {
      return next(createError(400, "Something went wrong!"));
    }

    await fs.rename(tmpDir, uploadDir);
    const avatarURL = path.join("avatars", newAvatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    console.log(error.message);
    next(error);
  }
}

module.exports = avatarUser;
