const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models");
const successRes = require("../../utils/successRes");

const storeImage = path.join(process.cwd(), "public", "avatars");

async function updateAvatar(req, res, next) {
  const { path: temporaryFileLocation, mimetype } = req.file;
  const { id } = req.user;

  const fileExtension = mimetype.slice(mimetype.lastIndexOf("/") + 1);
  const uniqFileName = `${id}.${fileExtension}`;
  const permanentFileLocation = path.join(storeImage, uniqFileName);
  const avatarURL = path.join("avatars", uniqFileName);

  try {
    const img = await Jimp.read(temporaryFileLocation);
    img.resize(250, 250).write(permanentFileLocation);
    const updatedUser = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

    res.json(successRes({ avatarURL: updatedUser.avatarURL }));
  } catch (err) {
    return next(err);
  } finally {
    await fs.unlink(temporaryFileLocation);
  }
}

module.exports = updateAvatar;
